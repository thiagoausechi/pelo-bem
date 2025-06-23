import NextImage from "next/image";
import { LoginForm } from "./form";

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md">
              <NextImage src="/logo.svg" alt="Logo" width={32} height={32} />
            </div>
            <span className="text-muted-foreground text-xl font-bold italic">
              Pelo Bem
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <NextImage
          src="/login-background.png"
          alt="Imagem de fundo com a fachada da clínica Pelo Bem"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
