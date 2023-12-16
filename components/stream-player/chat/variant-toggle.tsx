"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { MessageSquareIcon, UsersIcon } from "lucide-react";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar();

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? UsersIcon : MessageSquareIcon;

  const label = isChat ? "Go back to chat" : "Open Community";

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

    onChangeVariant(newVariant);
  };
  return (
    <Hint label={label} side="bottom" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
