"use client";
import { useTransition } from "react";
import { toast } from "sonner";

import { updateStream } from "@/actions/stream";

import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowerOnly";

interface IToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}

export const ToggleCard = ({ field, label, value }: IToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = (checked: boolean) => {
    startTransition(() => {
      updateStream({ [field]: checked })
        .then(() => {
          toast.success("Chat settings updated!");
        })
        .catch((err) => {
          toast.error(err.message ?? "Something went wrong!");
        });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            disabled={isPending}
            onCheckedChange={onChange}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
