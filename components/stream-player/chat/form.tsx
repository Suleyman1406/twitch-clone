"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatInfo } from "./info";

interface IChatFormProps {
  value: string;
  isHost: boolean;
  isHidden: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
  isFollowerOnly: boolean;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

export const ChatForm = ({
  value,
  onChange,
  onSubmit,
  isHost,
  isHidden,
  isDelayed,
  isFollowing,
  isFollowerOnly,
}: IChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowerOnlyAndNotFollowing = isFollowerOnly && !isFollowing;

  const isDisabled =
    isHidden || isDelayBlocked || isFollowerOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked && !isHost) {
      setIsDelayBlocked(true);

      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowerOnly={isFollowerOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10 focus-visible:ring-transparent focus-visible:ring-offset-0",
            isFollowerOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-9 w-12" />
      </div>
    </div>
  );
};
