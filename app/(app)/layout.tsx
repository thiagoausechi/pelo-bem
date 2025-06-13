import { AppLayout } from "@client/components/layout/app-layout";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
