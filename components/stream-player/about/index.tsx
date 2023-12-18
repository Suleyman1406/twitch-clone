"use client";

import { VerifiedMark } from "@/components/verified-mark";
import { Skeleton } from "@/components/ui/skeleton";
import { BioModal } from "./bio-modal";

interface IAboutProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const About = ({
  bio,
  hostName,
  hostIdentity,
  viewerIdentity,
  followedByCount,
}: IAboutProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="gorup rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName} <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};

export const AboutSkeleton = () => {
  return (
    <div className="px-4 w-full mb-20">
      <div className="gorup rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <Skeleton className="w-[230px] h-7" />
        <Skeleton className="w-[100px] h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
};
