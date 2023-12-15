"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] h-full bg-background border-r border-[#2D2E35] z-50",
        !collapsed && "lg:w-60"
      )}
    >
      {children}
    </aside>
  );
};
