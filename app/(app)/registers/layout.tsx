import { RegistersPage } from "@client/pages/registers";
import { type PropsWithChildren } from "react";

export default function RegistersLayout({ children }: PropsWithChildren) {
  return <RegistersPage>{children}</RegistersPage>;
}
