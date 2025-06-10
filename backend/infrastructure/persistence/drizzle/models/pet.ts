import { relations } from "drizzle-orm";
import { smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { owners } from "./owner";
import { appSchema, baseSchema } from "./schema";

export const pets = appSchema.table("pets", {
  ...baseSchema,

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => owners.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: text("name").notNull(),
  specie: text("specie").notNull(),
  breed: text("breed").notNull(),
  birthday: timestamp("birthday", { mode: "date" }).notNull(),
  weightGrams: smallint("weight_grams").notNull(),
  heightCm: smallint("height_cm").notNull(),
  gender: text("gender").notNull(),
});

export const petsRelations = relations(pets, ({ one }) => ({
  owner: one(owners, {
    fields: [pets.ownerId],
    references: [owners.id],
  }),
}));

export type PgPetModel = typeof pets.$inferSelect;

export type PgPetInsertModel = typeof pets.$inferInsert;
