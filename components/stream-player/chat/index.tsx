"use client";
import { useEffect, useMemo, useState } from "react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ChatHeader } from "./header";
import { ChatForm } from "./form";
import { ChatList } from "./list";

interface IChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowerOnly: boolean;
}

export const Chat = ({
  hostName,
  viewerName,
  isFollowing,
  hostIdentity,
  isChatDelayed,
  isChatEnabled,
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
          <p>Community Mode</p>
        </>
      )}
    </div>
  );
};
