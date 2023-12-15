"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IKeyCardProps {
  value: string | null;
}

export const KeyCard = ({ value }: IKeyCardProps) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="lg:flex items-start gap-x-10">
        <p className="font-semibold shrink-0 py-2">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              disabled
              type={showPass ? "text" : "password"}
              value={value || "hi"}
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            onClick={() => setShowPass((prev) => !prev)}
            variant="link"
            size="sm"
          >
            {showPass ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
