import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username,
      },
      include: {
        stream: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
      include: {
        stream: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
