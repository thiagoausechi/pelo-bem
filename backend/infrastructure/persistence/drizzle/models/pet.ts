import { genders, species } from "@server/domain/entities/pet";
import { relations } from "drizzle-orm";
import { smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";
import { owners } from "./owner";

export const specieEnum = appSchema.enum("personality", species);

export const genderEnum = appSchema.enum("gender", genders);

export const pets = appSchema.table("pets", {
  ...baseSchema,

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => owners.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: text("name").notNull(),
  specie: specieEnum("specie").notNull(),
  breed: text("breed").notNull(),
  birthday: timestamp("birthday", { mode: "date" }).notNull(),
  weightGrams: smallint("weight_grams").notNull(),
  heightCm: smallint("height_cm").notNull(),
  gender: genderEnum("gender").notNull(),
});

export const petsRelations = relations(pets, ({ one }) => ({
  owner: one(owners, {
    fields: [pets.ownerId],
    references: [owners.id],
  }),
}));

export type PgPetModel = typeof pets.$inferSelect;

export type PgPetInsertModel = typeof pets.$inferInsert;
