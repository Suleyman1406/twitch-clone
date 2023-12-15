"use client";

import { Button } from "@/components/ui/button";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface ICopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: ICopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const Icon = isCopied ? CheckCheckIcon : CopyIcon;
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onCopy}
      disabled={!value || isCopied}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
