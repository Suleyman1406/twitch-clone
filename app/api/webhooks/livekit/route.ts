import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headerPayload = headers();

    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new Response("No authorization header", { status: 400 });
    }
    const event = receiver.receive(body, authorization);

    switch (event.event) {
      case "ingress_started":
        await db.stream.update({
          where: {
            ingressId: event.ingressInfo?.ingressId,
          },
          data: {
            isLive: true,
          },
        });
        break;
      case "ingress_ended":
        await db.stream.update({
          where: {
            ingressId: event.ingressInfo?.ingressId,
          },
          data: {
            isLive: false,
          },
        });
        break;
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error!", { status: 500 });
  }

  return new Response("", { status: 200 });
}
