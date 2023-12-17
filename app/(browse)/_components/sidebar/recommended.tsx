"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { UserItem, UserItemSkeleton } from "./userItem";

interface IRecommendedProps {
  data: (User & { stream: { isLive: boolean } | null })[];
}

export const Recommended = ({ data }: IRecommendedProps) => {
  const { collapsed } = useSidebar();

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            isLive={user.stream?.isLive}
            username={user.username}
            imageUrl={user.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2 pt-4 lg:pt-0">
      <div className="px-3 pb-3 hidden lg:block">
        <Skeleton className="h-5 w-full" />
      </div>
      {[...new Array(3)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};
