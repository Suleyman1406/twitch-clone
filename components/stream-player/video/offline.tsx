import { WifiOffIcon } from "lucide-react";

interface IOfflineVideoProps {
  username: string;
}

export const OfflineVideo = ({ username }: IOfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOffIcon className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  );
};
