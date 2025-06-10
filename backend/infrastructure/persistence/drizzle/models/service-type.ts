import { real, text } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./schema";

export const serviceType = appSchema.table("service_type", {
  ...baseSchema,

  name: text("name").notNull().unique(),
  description: text("description"),
  price: real("price").notNull(),
});

export type PgServiceTypeModel = typeof serviceType.$inferSelect;

export type PgServiceTypeInsertModel = typeof serviceType.$inferInsert;
