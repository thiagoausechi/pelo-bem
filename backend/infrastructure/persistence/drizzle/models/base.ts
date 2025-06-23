import { env } from "@server/infrastructure/configs/env";
import { customType, pgSchema, timestamp, uuid } from "drizzle-orm/pg-core";

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

/**
 * Mapeia o tipo NUMERIC do PostgreSQL para o tipo `number` do TypeScript.
 * O Drizzle, por padrão, o trata como `string` para evitar perda de precisão.
 * Este custom type faz a conversão segura assumindo que o valor cabe em um `number`.
 * @param name - O nome da coluna no banco de dados.
 */
export const numericToNumber = (
  name: string,
  options?: { precision?: number; scale?: number },
) =>
  customType<{ data: number; driverData: string }>({
    dataType: () => {
      if (options?.precision && options?.scale)
        return `numeric(${options.precision}, ${options.scale})`;

      if (options?.precision) return `numeric(${options.precision})`;

      return "numeric";
    },
    fromDriver: (value: string): number => parseFloat(value),
    toDriver: (value: number): string => value.toString(),
  })(name);
