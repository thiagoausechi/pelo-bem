import { cn } from "@client/lib/utils";
import type { ComponentProps } from "react";
import { Header } from "./header";

type Props = ComponentProps<"div">;

export function AppLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        "flex h-[100svh] flex-1 flex-col overflow-x-hidden overflow-y-auto",
        className,
      )}
    >
      <Header />

      <main className="@container/main isolate flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
