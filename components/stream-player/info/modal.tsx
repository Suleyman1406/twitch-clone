"use client";
import { ElementRef, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hint } from "@/components/hint";
import { TrashIcon } from "lucide-react";

interface IInfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: IInfoModalProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name, thumbnailUrl })
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
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="rounded-xl border outline-dashed outline-muted">
              {thumbnailUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute top-2 right-2 z-10">
                    <Hint label="Remove thumbnail" asChild side="left">
                      <Button
                        type="button"
                        onClick={() => setThumbnailUrl(null)}
                        disabled={isPending}
                        className="h-auto w-auto p-1.5"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    fill
                    alt="Thumbnail"
                    src={thumbnailUrl}
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: { color: "#fff" },
                    allowedContent: {
                      color: "#fff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                  }}
                />
              )}
            </div>
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
