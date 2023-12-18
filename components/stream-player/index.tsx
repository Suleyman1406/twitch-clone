"use client";

import { Stream, User } from "@prisma/client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { cn } from "@/lib/utils";

import { LiveKitRoom } from "@livekit/components-react";
import { Header, HeaderSkeleton } from "./header";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat/toggle";
import { About, AboutSkeleton } from "./about";
import { Info } from "./info";

interface IStreamPlayerProps {
  user: User & { stream: Stream | null; _count: { followedBy: number } };
  isFollowing: boolean;
}
export const StreamPlayer = ({ user, isFollowing }: IStreamPlayerProps) => {
  const { token, name, idenditity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar();

  if (!token || !name || !idenditity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={idenditity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={user.stream?.name || ""}
          />
          <Info
            hostIdentity={user.id}
            viewerIdentity={idenditity}
            name={user.stream?.name || ""}
            thumbnailUrl={user.stream?.thumbnailUrl || ""}
          />
          <About
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={idenditity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostIdentity={user.id}
            hostName={user.username}
            isFollowing={isFollowing}
            viewerIdentity={idenditity}
            isChatEnabled={user.stream?.isChatEnabled ?? true}
            isChatDelayed={user.stream?.isChatDelayed ?? true}
            isChatFollowerOnly={user.stream?.isChatFollowerOnly ?? true}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full gap-y-2">
      <div className="space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-8">
        <VideoSkeleton />
        <HeaderSkeleton />
        <AboutSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
