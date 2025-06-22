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
        lg: "size-44",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const sizeInPixels: Record<
  Exclude<Required<VariantProps<typeof avatarVariants>>["size"], null>,
  number
> = {
  default: 32,
  md: 58,
  lg: 176,
};

type AvatarContextValue = VariantProps<typeof avatarVariants>;

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export function useAvatarContext() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error(
      "useAvatarContext deve ser utilizado dentro de <Avatar />.",
    );
  }
  return context;
}

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarContext.Provider
      value={{
        size,
      }}
    >
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(avatarVariants({ size, className }))}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, src, alt, ...props }: ImageProps) {
  const { size } = useAvatarContext();
  const imageSize = size ? sizeInPixels[size] : sizeInPixels.default;

  const srcAsString =
    typeof src === "string" ? src : "src" in src ? src.src : src.default.src;

  return (
    <AvatarPrimitive.Image src={srcAsString} asChild>
      <NextImage
        data-slot="avatar-image"
        className={cn("aspect-square size-full", className)}
        src={src}
        width={imageSize}
        height={imageSize}
        alt={alt}
        {...props}
      />
    </AvatarPrimitive.Image>
  );
}

function AvatarFallback({
  className,
  children = (
    <UserRound className="size-full p-1.5 @min-[50px]/avatar:p-2.5 @min-[110px]/avatar:p-4" />
  ),
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-input/30 text-muted-foreground flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
