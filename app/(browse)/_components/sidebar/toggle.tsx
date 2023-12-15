"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar();

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label="Expand" side="right" asChild>
            <Button onClick={onExpand} className="h-auto p-2" variant="ghost">
              <ArrowRightFromLineIcon className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mt-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label="Collapse" side="right" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={onCollapse}
            >
              <ArrowLeftFromLineIcon className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pt-6 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6 mr-2" />
    </div>
  );
};
