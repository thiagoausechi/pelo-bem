import { text } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";

export const users = appSchema.table("users", {
  ...baseSchema,
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export type PgUserModel = typeof users.$inferSelect;

export type PgUserInsertModel = typeof users.$inferInsert;
