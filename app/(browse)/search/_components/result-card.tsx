import { formatDistanceToNow } from "date-fns";
import { User } from "@prisma/client";
import Link from "next/link";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { VerifiedMark } from "@/components/verified-mark";
import { Skeleton } from "@/components/ui/skeleton";

interface IResultCardProps {
  data: {
    id: string;
    user: User;
    name: string;
    isLive: boolean;
    updatedAt: Date;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: IResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            isLive={data.isLive}
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-12 h-3" />
      </div>
    </div>
  );
};
