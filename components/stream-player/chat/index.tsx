"use client";
import { useEffect, useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ChatHeader, ChatHeaderSkeleton } from "./header";
import { ChatForm, ChatFormSkeleton } from "./form";
import { ChatList, ChatListSkeleton } from "./list";
import { ChatCommunity } from "./community";

interface IChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  viewerIdentity: string;
  isChatFollowerOnly: boolean;
}

export const Chat = ({
  hostName,
  viewerName,
  isFollowing,
  hostIdentity,
  isChatDelayed,
  isChatEnabled,
  viewerIdentity,
  isChatFollowerOnly,
}: IChatProps) => {
  const [value, setValue] = useState("");
  const { variant, onExpand } = useChatSidebar();
  const matches = useMediaQuery("(max-width: 1024px)");
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const { chatMessages: messages, send } = useChat();

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort(
      (messageA, messageB) => messageB.timestamp - messageA.timestamp
    );
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            value={value}
            isHost={isHost}
            onSubmit={onSubmit}
            onChange={onChange}
            isHidden={isHidden}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
            isFollowerOnly={isChatFollowerOnly}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
