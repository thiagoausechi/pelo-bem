import { genders, species } from "@core/contracts/enums/pets";
import { relations } from "drizzle-orm";
import { smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { appSchema, baseSchema, numericToNumber } from "./base";
import { owners } from "./owner";

export const specieEnum = appSchema.enum("specie", species);

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
  weightKg: numericToNumber("weight_kg", {
    precision: 6, // 6 dígitos no total
    scale: 3, // 3 dígitos após o ponto decimal
    // Pode ir de 0.000 até 999.999
  })
    .$type<number>()
    .notNull(),
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
