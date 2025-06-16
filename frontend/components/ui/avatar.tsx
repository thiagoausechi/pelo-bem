"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@client/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { UserRound } from "lucide-react";
import NextImage, { type ImageProps } from "next/image";

const avatarVariants = cva(
  "@container/avatar border-input border relative flex size-8 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "size-8",
        md: "size-14",
        lg: "size-28",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  );
}

function AvatarImage({ className, src, alt, ...props }: ImageProps) {
  const srcAsString =
    typeof src === "string" ? src : "src" in src ? src.src : src.default.src;

  return (
    <AvatarPrimitive.Image src={srcAsString} asChild>
      <NextImage
        data-slot="avatar-image"
        className={cn("aspect-square size-full", className)}
        src={src}
        width={64}
        height={64}
        alt={alt}
        {...props}
      />
    </AvatarPrimitive.Image>
  );
}

function AvatarFallback({
  className,
  children = (
    <UserRound className="text-muted-foreground size-full p-1.5 @min-[50px]/avatar:p-2.5 @min-[110px]/avatar:p-4" />
  ),
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-input/30 flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
