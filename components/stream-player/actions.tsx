"use client";

import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface IActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}
export const Actions = ({
  isHost,
  isFollowing,
  hostIdentity,
}: IActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");

    if (isHost) return;

    startTransition(() => {
      if (isFollowing) {
        onUnfollow(hostIdentity)
          .then((data) =>
            toast.success(`You have  unfollowed ${data.following.username}`)
          )
          .catch((error) => toast.error(error || "Something went wrong."));
      } else {
        onFollow(hostIdentity)
          .then((data) =>
            toast.success(`You are now following ${data.following.username}`)
          )
          .catch((error) => toast.error(error || "Something went wrong."));
      }
    });
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <HeartIcon
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
