"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: IWrapperProps) => {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed ? "w-[70px]" : "w-60"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
