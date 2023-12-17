"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { onUserUpdate } from "@/actions/user";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IBioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: IBioModalProps) => {
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const [bio, setBio] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      onUserUpdate({ bio })
        .then(() => {
          toast.success(`Your bio updated`);
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
          <DialogTitle>Edit your bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isPending}
            className="resize-none"
          />
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
