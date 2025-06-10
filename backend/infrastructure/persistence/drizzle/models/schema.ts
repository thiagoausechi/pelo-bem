import { env } from "@server/infrastructure/configs/env";
import { pgSchema, timestamp, uuid } from "drizzle-orm/pg-core";
import { owners } from "./owner";
import { genderEnum, pets, petsRelations, specieEnum } from "./pet";
import { serviceType } from "./service-type";
import { veterinarians } from "./veterinarians";

export const appSchema = pgSchema(env.DATABASE_SCHEMA);

export const baseSchema = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
} as const;

export const schema = {
  owners,
  specieEnum,
  genderEnum,
  pets,
  veterinarians,
  serviceType,
  petsRelations,
};
