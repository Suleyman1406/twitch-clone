"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./userItem";
import { Skeleton } from "@/components/ui/skeleton";

interface IFollowingProps {
  data: (Follow & { following: User })[];
}

export const Following = ({ data }: IFollowingProps) => {
  const { collapsed } = useSidebar();

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="">
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((folow) => (
          <UserItem
            key={folow.followingId}
            username={folow.following.username}
            imageUrl={folow.following.imageUrl}
            // isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      <div className="px-3 pb-3 hidden lg:block">
        <Skeleton className="h-5 w-full" />
      </div>
      {[...new Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
