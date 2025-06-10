import { text } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./schema";

export const veterinarians = appSchema.table("veterinarians", {
  ...baseSchema,

  fullname: text("fullname").notNull(),
  license: text("license").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export type PgVeterinarianModel = typeof veterinarians.$inferSelect;

export type PgVeterinarianInsertModel = typeof veterinarians.$inferInsert;
