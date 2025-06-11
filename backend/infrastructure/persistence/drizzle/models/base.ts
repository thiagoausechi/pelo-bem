import { env } from "@server/infrastructure/configs/env";
import { pgSchema, timestamp, uuid } from "drizzle-orm/pg-core";

export const appSchema = env.DATABASE_SCHEMA
  ? pgSchema(env.DATABASE_SCHEMA)
  : // @ts-expect-error: `pgSchema` requer 1 argumento, mas o Drizzle pede nenhum caso o schema seja "public"
    pgSchema();

export const baseSchema = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
} as const;
