import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const block = await blockUser(id);

  revalidatePath("/");
  if (block) revalidatePath(`/${block.blocked.id}`);

  return block;
};

export const onUnblock = async (id: string) => {
  const unblock = await unblockUser(id);

  revalidatePath("/");
  if (unblock) revalidatePath(`/${unblock.blocked.id}`);

  return unblock;
};
