import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Verifique os detalhes de utilização e configuração
 * de cada variável de ambiente no arquivo `.env.example`.
 */
export const env = createEnv({
  /**
   * Especifique o esquema das variáveis de ambiente do lado do servidor aqui.
   * Assim, você garante que o app não será construído ('build') com variáveis de ambiente inválidas.
   */
  server: {
    /**===================================================================================================
     *  Banco de Dados (Drizzle ORM)
     * =================================================================================================== */
    DATABASE_PROTOCOL: z.enum(["http", "https", "postgres", "mysql"]),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PARAMS: z.string().optional(),
    DATABASE_URL: z.string().url(),
    DATABASE_SCHEMA: z
      .string()
      .optional()
      .refine((val) => val !== "public", {
        message:
          'O Postgres usa o schema "public" por padrão. Você pode omitir essa variável de ambiente se não estiver usando outro schema.',
      }),

    /**===================================================================================================
     *  Armazenamento de Arquivos (S3 File Storage) + NextConfig (Images)
     * =================================================================================================== */
    S3_BUCKET_NAME: z.string(),
    S3_REGION: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_FORCE_PATH_STYLE: z.coerce.boolean().default(false),
    S3_PROTOCOL: z.enum(["http", "https"]),
    S3_HOST: z.string(),
    S3_PORT: z.string().optional(), // Necessário para o MinIO, mas não com AWS S3

    S3_PUBLIC_URL: z.string().url(),
    S3_ENDPOINT: z.string().url().optional(), // Necessário para o MinIO, mas não com AWS S3

    /**===================================================================================================
     *  Ambiente de Execução
     * =================================================================================================== */
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
    ...processDatabaseVariables(),
    ...processFileStorageVariables(),
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

function processDatabaseVariables() {
  const vars = {
    DATABASE_PROTOCOL: process.env.DATABASE_PROTOCOL,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PARAMS: process.env.DATABASE_PARAMS ?? "",
    DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
  };

  const DATABASE_URL =
    process.env.DATABASE_URL ??
    `${vars.DATABASE_PROTOCOL}://${vars.DATABASE_USER}:${vars.DATABASE_PASSWORD}@${vars.DATABASE_HOST}:${vars.DATABASE_PORT}/${vars.DATABASE_NAME}${vars.DATABASE_PARAMS}`;

  return {
    ...vars,
    DATABASE_URL,
  };
}

function processFileStorageVariables() {
  const vars = {
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_PUBLIC_URL: process.env.S3_PUBLIC_URL,
    S3_FORCE_PATH_STYLE: process.env.S3_FORCE_PATH_STYLE,
    S3_PROTOCOL: process.env.S3_PROTOCOL,
    S3_HOST: process.env.S3_HOST,
    S3_PORT: process.env.S3_PORT ?? "",
  };

  const S3_ENDPOINT =
    process.env.S3_ENDPOINT ??
    `${vars.S3_PROTOCOL}://${vars.S3_HOST}${vars.S3_PORT ? `:${vars.S3_PORT}` : ""}`;

  const S3_PUBLIC_URL =
    process.env.S3_PUBLIC_URL ?? `${S3_ENDPOINT}/${vars.S3_BUCKET_NAME}`;

  return {
    ...vars,
    S3_ENDPOINT,
    S3_PUBLIC_URL,
  };
}
