import "@client/styles/globals.css";

import { type Metadata } from "next";
import type { PropsWithChildren } from "react";

import { ClientProviders } from "@client/components/providers";
import { lora } from "@client/styles/fonts";

export const metadata: Metadata = {
  title: "Pelo Bem | Administrativo",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR" className={`${lora.variable}`}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
