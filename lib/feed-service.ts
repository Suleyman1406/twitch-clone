import { getSelf } from "./auth-service";
import { db } from "./db";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let query = {};

  if (userId) {
    query = {
      user: {
        blocking: {
          every: {
            blockedId: {
              not: userId,
            },
          },
        },
      },
    };
  }
  const streams = await db.stream.findMany({
    where: query,
    select: {
      id: true,
      name: true,
      user: true,
      isLive: true,
      thumbnailUrl: true,
    },
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};
