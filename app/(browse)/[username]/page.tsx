import { notFound } from "next/navigation";

import { getIsFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { getIsBlockedByUser } from "@/lib/block-service";

import { StreamPlayer } from "@/components/stream-player";

interface IUserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params: { username } }: IUserPageProps) => {
  const user = await getUserByUsername(username);

  if (!user || !user.stream) {
    return notFound();
  }

  const isFollowing = await getIsFollowingUser(user.id);
  const isBlockedByUser = await getIsBlockedByUser(user.id);

  return (
    <div className="h-full">
      <StreamPlayer user={user} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
