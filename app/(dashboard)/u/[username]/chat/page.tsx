import { redirect } from "next/navigation";
import { toast } from "sonner";

import { getStreamByUserId } from "@/lib/stream-service";
import { getSelf } from "@/lib/auth-service";

import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    toast.error("Something went wrong! Stream not found.");
    redirect("/");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowerOnly"
          label="Must be following to chat"
          value={stream.isChatFollowerOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
