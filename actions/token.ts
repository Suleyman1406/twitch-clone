"use server";

import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

import { getIsBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { getSelf } from "@/lib/auth-service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;
  try {
    self = await getSelf();
  } catch (error) {
    console.error(error);
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 10000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found!");
  }

  const isBlocked = await getIsBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked!");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
