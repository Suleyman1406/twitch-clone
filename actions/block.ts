"use server";
import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

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
