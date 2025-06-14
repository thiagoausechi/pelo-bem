import type { PropsWithChildren } from "react";
import { TanstackReactQueryProvider } from "./react-query";

export function ClientProviders({ children }: PropsWithChildren) {
  return <TanstackReactQueryProvider>{children}</TanstackReactQueryProvider>;
}
