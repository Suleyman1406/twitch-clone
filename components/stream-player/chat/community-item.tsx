"use client";

import { MinusCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { cn, stringToColor } from "@/lib/utils";
import { onBlock } from "@/actions/block";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface ICommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}
export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: ICommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`Blocked ${participantName}`);
        })
        .catch((e) => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
          >
            <MinusCircleIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
