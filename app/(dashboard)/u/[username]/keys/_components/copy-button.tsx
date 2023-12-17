"use client";

import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
interface ICopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: ICopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
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
