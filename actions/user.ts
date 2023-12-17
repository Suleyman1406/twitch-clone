"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const onUserUpdate = async (values: Partial<User>) => {
  const self = await getSelf();

  const user = await db.user.update({
    where: {
      id: self.id,
    },
    data: values,
  });

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
};
