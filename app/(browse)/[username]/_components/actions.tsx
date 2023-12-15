"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import React, { useEffect, useTransition } from "react";
import { toast } from "sonner";

export const Actions = ({
  isFollowing,
  user,
}: {
  isFollowing: boolean;
  user: User;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(user.id)
        .then(() => {
          toast.success("Followed");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(user.id)
        .then(() => {
          toast.success("UnFollowed");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      // onBlock(user.id)
      onUnblock(user.id)
        .then(() => {
          toast.success("Blocked");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
