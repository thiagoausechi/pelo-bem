import { cn } from "@client/lib/utils";
import type React from "react";

interface SkeletonProps<T> {
  data: T | null | undefined;
  placeholder: React.ReactNode;
  children: (data: T) => React.ReactNode;
}

function Skeleton<T>({ data, placeholder, children }: SkeletonProps<T>) {
  if (data === null || data === undefined) return placeholder;

  return children(data);
}

function Placeholder({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-input/30 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Placeholder, Skeleton };
