"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface IUnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: IUnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleUnblock = async () => {
    startTransition(() => {
      onUnblock(userId)
        .then(() => toast.success("User unblocked"))
        .catch(() => toast.error("Failed to unblock user"));
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={handleUnblock}
      variant="link"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
