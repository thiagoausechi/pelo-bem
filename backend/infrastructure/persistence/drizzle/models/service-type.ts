import { real, text } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";

export const serviceTypes = appSchema.table("service_types", {
  ...baseSchema,

  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  price: real("price").notNull(),
});

export type PgServiceTypeModel = typeof serviceTypes.$inferSelect;

export type PgServiceTypeInsertModel = typeof serviceTypes.$inferInsert;
