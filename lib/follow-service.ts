import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getIsFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (id === self.id) {
      return true;
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot follow yourself!");
  }

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  const alreadyExist = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!!alreadyExist) {
    throw new Error("Already followed!");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot unfollow yourself!");
  }

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following!");
  }

  const follow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: {
      following: true,
    },
  });

  return follow;
};
