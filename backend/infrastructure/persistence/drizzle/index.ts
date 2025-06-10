import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@server/infrastructure/configs/env";
import { schema } from "./models/schema";

/**
 * Armazena em cache a conexão com o banco de dados durante o desenvolvimento.
 * Isso evita criar uma nova conexão a cada atualização do HMR (Hot Module Replacement).
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

// Desabilite o prefetch pois não é suportado no modo de pool "Transaction"
const conn = globalForDb.conn ?? postgres(env.DATABASE_URL, { prepare: false });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
