import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        bio: true,
        username: true,
        imageUrl: true,
        externalUserId: true,
        stream: {
          select: {
            id: true,
            name: true,
            isLive: true,
            thumbnailUrl: true,
            isChatDelayed: true,
            isChatEnabled: true,
            isChatFollowerOnly: true,
          },
        },
        _count: {
          select: {
            followedBy: true,
          },
        },
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
