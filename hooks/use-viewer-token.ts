"use client";

import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [idenditity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);

        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }
        if (name) {
          setName(name);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    };
    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    idenditity,
  };
};
