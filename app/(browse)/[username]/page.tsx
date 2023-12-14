import { getIsFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
import { Actions } from "./_components/actions";

interface IUserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params: { username } }: IUserPageProps) => {
  const user = await getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  const isFollowing = await getIsFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>isFollowing: {isFollowing + ""}</p>
      <Actions isFollowing={isFollowing} user={user} />
    </div>
  );
};

export default UserPage;
