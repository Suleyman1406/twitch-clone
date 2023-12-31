import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {}

  const users = await db.user.findMany({
    where: {
      id: {
        not: userId,
      },
      followedBy: {
        every: {
          followerId: { not: userId },
        },
      },
      blocking: {
        every: {
          blockedId: { not: userId },
        },
      },
      // blockedBy: {
      //   every: {
      //     blockerId: { not: userId },
      //   },
      // },
    },
    orderBy: [{ stream: { isLive: "desc" } }, { createdAt: "desc" }],
    include: {
      stream: {
        select: {
          isLive: true,
        },
      },
    },
  });

  return users;
};
