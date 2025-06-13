"use client";

import { cn } from "@client/lib/utils";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { NavLink } from "./nav-link";

export function MobileLink({
  link,
  onOpenChange,
  className,
  ...props
}: ComponentProps<typeof NavLink> & {
  onOpenChange?: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <NavLink
      link={link}
      onClick={() => {
        void router.push(link.href);
        onOpenChange?.(false);
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    />
  );
}
