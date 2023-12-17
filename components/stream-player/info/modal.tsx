"use client";

import { updateStream } from "@/actions/stream";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface IInfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: IInfoModalProps) => {
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success("Stream updated.");
          closeButtonRef.current?.click();
        })
        .catch((err) => toast.error(err.message || "Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="stream-name-input">Name</Label>
            <Input
              id="stream-name-input"
              value={name}
              disabled={isPending}
              onChange={onChange}
              placeholder="Stream name"
            />
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeButtonRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
