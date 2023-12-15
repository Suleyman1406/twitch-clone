import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface INavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}
export const NavItem = ({
  label,
  icon: Icon,
  href,
  isActive,
}: INavItemProps) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 justify-start",
        collapsed && "justify-center",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
