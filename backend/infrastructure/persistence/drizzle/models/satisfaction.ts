import { ratings } from "@core/contracts/enums/service-orders";
import { relations } from "drizzle-orm";
import { text, uuid } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";
import { serviceOrders } from "./service-order";

export const ratingEnum = appSchema.enum("rating", ratings);

export const satisfaction = appSchema.table("ratings", {
  ...baseSchema,

  serviceOrderId: uuid("service_order_id")
    .notNull()
    .references(() => serviceOrders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  rating: ratingEnum("rating").notNull(),
  comment: text("comment"),
});

export const satisfactionRelations = relations(satisfaction, ({ one }) => ({
  serviceOrder: one(serviceOrders, {
    fields: [satisfaction.serviceOrderId],
    references: [serviceOrders.id],
  }),
}));

export type PgSatisfactionModel = typeof satisfaction.$inferSelect;

export type PgSatisfactionInsertModel = typeof satisfaction.$inferInsert;
