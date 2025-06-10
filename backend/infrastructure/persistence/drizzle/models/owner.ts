import { text } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./schema";

export const owners = appSchema.table("owners", {
  ...baseSchema,
  fullname: text("fullname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export type PgOwnerModel = typeof owners.$inferSelect;

export type PgOwnerInsertModel = typeof owners.$inferInsert;
