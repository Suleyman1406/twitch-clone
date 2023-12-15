"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface IStreamPlayerProps {
  user: User & { stream: Stream | null };
  isFollowing: boolean;
}
export const StreamPlayer = ({ user, isFollowing }: IStreamPlayerProps) => {
  const { token, name, idenditity } = useViewerToken(user.id);

  if (!token || !name || !idenditity) {
    return <div>Cannot watch the stream</div>;
  }

  return <div>Allowed to watch stream</div>;
};
