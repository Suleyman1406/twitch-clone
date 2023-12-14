"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import React from "react";
import { UserItem, UserItemSkeleton } from "./userItem";
import { Skeleton } from "@/components/ui/skeleton";

interface IRecommendedProps {
  data: User[];
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
            isLive={false}
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
