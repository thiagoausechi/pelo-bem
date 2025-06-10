import { env } from "@server/infrastructure/configs/env";
import { pgSchema, timestamp, uuid } from "drizzle-orm/pg-core";
import { owners } from "./owner";
import { genderEnum, pets, petsRelations, specieEnum } from "./pet";
import {
  ratingEnum,
  satisfaction,
  satisfactionRelations,
} from "./satisfaction";
import {
  serviceOrders,
  serviceOrdersRelations,
  statusEnum,
} from "./service-order";
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
  // Owner related schemas
  owners,

  // Pet related schemas
  specieEnum,
  genderEnum,
  pets,
  petsRelations,

  // Veterinarian related schemas
  veterinarians,

  // Service Order related schemas
  serviceType,
  statusEnum,
  serviceOrders,
  serviceOrdersRelations,
  ratingEnum,
  satisfaction,
  satisfactionRelations,
};
