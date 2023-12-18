import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getSearch = async (term: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (err) {}

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
    where: {
      ...query,
      OR: [
        {
          name: {
            contains: term,
          },
        },
        {
          user: {
            username: {
              contains: term,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      user: true,
      name: true,
      isLive: true,
      updatedAt: true,
      thumbnailUrl: true,
    },
    orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
  });

  return streams;
};
