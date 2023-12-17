import { UserButton } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Actions = async () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href="/">
          <LogOutIcon className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
