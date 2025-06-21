import { cn } from "@client/lib/utils";
import type React from "react";

interface SkeletonProps<T> {
  isLoading: boolean;
  data: T | null | undefined;
  placeholder: React.ReactNode;
  children: (data: T) => React.ReactNode;
}

function Skeleton<T>({
  isLoading,
  data,
  placeholder,
  children,
}: SkeletonProps<T>) {
  if (isLoading) return placeholder;

  if (data) return children(data);

  return null;
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
