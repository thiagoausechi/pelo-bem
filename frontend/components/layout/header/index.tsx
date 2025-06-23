"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LogoutAction } from "../actions/auth/logout";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import type { Link } from "./nav-link";

const navbarLinks: Link[] = [
  {
    label: "Cadastros",
    href: "/registers",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <div className="@container/header isolate container mx-auto grid h-16 grid-cols-3 items-center justify-between px-4 **:data-[slot=separator]:!h-4 md:px-6">
        <NextLink href="/">
          <div className="flex items-center gap-2">
            <NextImage src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-muted-foreground font-bold italic">
              Pelo Bem
            </span>
          </div>
        </NextLink>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <DesktopNav links={navbarLinks} currentPath={pathname} />
          <MobileNav links={navbarLinks} currentPath={pathname} />
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-4">
          <LogoutAction />
        </div>
      </div>
    </header>
  );
}
