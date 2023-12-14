"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import React from "react";
import { UserItem, UserItemSkeleton } from "./userItem";

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
            isLive={true}
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
    <ul className="px-2">
      {[...new Array(3)].map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};
