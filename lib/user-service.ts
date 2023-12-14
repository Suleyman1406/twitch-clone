import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
