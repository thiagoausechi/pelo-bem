import { Button } from "@client/components/ui/button";
import NextLink from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen w-full flex-1 flex-col items-center justify-center">
      <section className="border-grid">
        <div className="container-wrapper">
          <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
            <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Página Temporária
            </h1>
            <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
              Será substituída redirecionando para a página de login ou
              dashboard dependendo do estado de autenticação do usuário.
            </p>
            <div
              id="actions"
              className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none"
            >
              <Button asChild size="sm">
                <NextLink href="/login">Login</NextLink>
              </Button>
              <Button asChild size="sm" variant="link">
                <NextLink href="/dashboard">Dashboard</NextLink>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
