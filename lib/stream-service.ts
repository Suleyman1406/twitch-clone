import { db } from "./db";

export const getStreamByUserId = async (userId: string) => {
  try {
    const stream = await db.stream.findUniqueOrThrow({ where: { userId } });

    return stream;
  } catch (error) {
    console.error(error);
    return null;
  }
};
