import { InfoIcon } from "lucide-react";
import React, { useMemo } from "react";

import { Hint } from "@/components/hint";

interface IChatInfoProps {
  isDelayed: boolean;
  isFollowerOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowerOnly }: IChatInfoProps) => {
  const value = useMemo(() => {
    if (isFollowerOnly && !isDelayed) {
      return { hint: "Only followers can chat.", label: "Followers only" };
    }
    if (isDelayed && !isFollowerOnly) {
      return {
        hint: "Messages are delayed by 3 seconds.",
        label: "Slow mode",
      };
    }
    if (isDelayed && isFollowerOnly) {
      return {
        hint: "Only followers can chat. Messages are delayed by 3 seconds.",
        label: "Followers only and slow mode",
      };
    }
    return { hint: "", label: "" };
  }, [isDelayed, isFollowerOnly]);

  if (!isDelayed && !isFollowerOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={value.hint}>
        <InfoIcon className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{value.label}</p>
    </div>
  );
};
