"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface IContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: IContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
