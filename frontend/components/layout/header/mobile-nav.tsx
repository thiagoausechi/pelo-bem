"use client";

import { Button } from "@client/components/ui/button";
import { Popover, PopoverContent } from "@client/components/ui/popover";
import { cn } from "@client/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { MobileLink } from "./mobile-link";
import { type Link } from "./nav-link";

interface Props {
  links: Link[];
  currentPath: string;
}

export function MobileNav({ links, currentPath }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="extend-touch-target hover:text-foreground! touch-manipulation items-center justify-start gap-2.5 hover:bg-transparent! focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent md:hidden"
        >
          <span className="flex items-center text-lg leading-none font-medium">
            Menu
          </span>
          <div className="relative flex h-8 w-4 items-center justify-center">
            <span className="sr-only">Alternar Menu</span>
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="center"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <nav className="flex flex-col gap-4">
          <ul className="flex flex-col items-center gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <MobileLink
                  link={link}
                  active={currentPath.includes(link.href)}
                  onOpenChange={setOpen}
                />
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
