import { serviceOrderStatus } from "@server/domain/entities/service-order";
import { relations } from "drizzle-orm";
import { pgEnum, timestamp, uuid } from "drizzle-orm/pg-core";
import { pets } from "./pet";
import { appSchema, baseSchema } from "./schema";
import { serviceType } from "./service-type";
import { veterinarians } from "./veterinarians";

export const statusEnum = pgEnum("status", serviceOrderStatus);

export const serviceOrders = appSchema.table("service_orders", {
  ...baseSchema,

  petId: uuid("pet_id").references(() => pets.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  veterinarianId: uuid("veterinarian_id").references(() => veterinarians.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  serviceTypeId: uuid("service_type_id").references(() => serviceType.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  appointmentDate: timestamp("appointment_date", {
    withTimezone: true,
  }).notNull(),
  status: statusEnum("status").notNull(),
});

export const serviceOrdersRelations = relations(serviceOrders, ({ one }) => ({
  pet: one(pets, {
    fields: [serviceOrders.petId],
    references: [pets.id],
  }),
  veterinarian: one(veterinarians, {
    fields: [serviceOrders.veterinarianId],
    references: [veterinarians.id],
  }),
  serviceType: one(serviceType, {
    fields: [serviceOrders.serviceTypeId],
    references: [serviceType.id],
  }),
}));

export type PgServiceOrderModel = typeof serviceOrders.$inferSelect;

export type PgServiceOrderInsertModel = typeof serviceOrders.$inferInsert;
