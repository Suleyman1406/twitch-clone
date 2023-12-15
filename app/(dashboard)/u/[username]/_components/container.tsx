"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onExpand, onCollapse]);

  return (
    <div className={cn("flex-1 ml-[70px]", !collapsed && "lg:ml-60")}>
      {children}
    </div>
  );
};
