import { serviceOrderStatus } from "@core/contracts/enums/service-orders";
import { relations } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";
import { pets } from "./pet";
import { serviceType } from "./service-type";
import { veterinarians } from "./veterinarian";

export const statusEnum = appSchema.enum("status", serviceOrderStatus);

export const serviceOrders = appSchema.table("service_orders", {
  ...baseSchema,

  petId: uuid("pet_id")
    .references(() => pets.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  veterinarianId: uuid("veterinarian_id")
    .references(() => veterinarians.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  serviceTypeId: uuid("service_type_id")
    .references(() => serviceType.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
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
