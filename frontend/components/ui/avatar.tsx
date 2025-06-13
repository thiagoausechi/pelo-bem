"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@client/lib/utils";
import NextImage, { type ImageProps } from "next/image";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
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
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
