"use server";
import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";

import { getStreamByUserId } from "@/lib/stream-service";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const updateStream = async (values: Partial<Stream>) => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found!");
  }

  const validData = {
    name: values.name,
    isChatEnabled: values.isChatEnabled,
    isChatDelayed: values.isChatDelayed,
    isChatFollowerOnly: values.isChatFollowerOnly,
  };
  const updatedStream = await db.stream.update({
    where: {
      id: stream.id,
    },
    data: validData,
  });

  revalidatePath(`/u/${self.username}/chat`);
  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return updatedStream;
};
