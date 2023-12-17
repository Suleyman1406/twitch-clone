"use server";

import { roomService } from "@/constants";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let block;

  try {
    block = await blockUser(id);
  } catch (error) {
    console.error(error);
  }
  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {}

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/u/${self.username}/community`);

  return block;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblock = await unblockUser(id);

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/u/${self.username}/community`);

  return unblock;
};
