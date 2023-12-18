import { User } from "@prisma/client";
import Link from "next/link";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";

interface IResultCardProps {
  data: {
    user: User;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: IResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="group h-full w-full space-y-4 relative">
        <Thumbnail
          isLive={data.isLive}
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          username={data.user.username}
        />
        {data.isLive && (
          <div className="absolute -top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform">
            <LiveBadge />
          </div>
        )}
        <div className="flex gap-x-3 items-center">
          <UserAvatar
            isLive={data.isLive}
            username={data.user.username}
            imageUrl={data.user.imageUrl}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
