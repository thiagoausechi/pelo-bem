import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Especifique o esquema das variáveis de ambiente do lado do servidor aqui.
   * Assim, você garante que o app não será construído ('build') com variáveis de ambiente inválidas.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Especifique o esquema das variáveis de ambiente do lado do cliente aqui.
   * Assim, você garante que o app não será construído ('build') com variáveis de ambiente inválidas.
   *
   * Para expô-las ao cliente, prefixe com `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * Não é possível desestruturar `process.env` como um objeto comum nos "edge runtimes" do Next.js (ex:
   * middlewares) ou no lado do cliente, então precisamos desestruturar manualmente.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Execute `build` ou `dev` com `SKIP_ENV_VALIDATION` para pular a validação das variáveis de ambiente.
   * Isso é especialmente útil para builds com Docker.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Faz com que strings vazias sejam tratadas como undefined.
   * `VAR_EXEMPLO: z.string()` e `VAR_EXEMPLO=''` lançarão um erro.
   */
  emptyStringAsUndefined: true,
});
