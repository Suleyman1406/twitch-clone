"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  const follow = await followUser(id);

  revalidatePath("/");
  if (follow) revalidatePath(`/${follow.following.username}`);

  return follow;
};
export const onUnfollow = async (id: string) => {
  const follow = await unfollowUser(id);

  revalidatePath("/");
  if (follow) revalidatePath(`/${follow.following.username}`);

  return follow;
};
