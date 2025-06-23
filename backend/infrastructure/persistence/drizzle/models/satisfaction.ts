import { ratings } from "@core/contracts/enums/service-orders";
import { relations } from "drizzle-orm";
import { text, uuid } from "drizzle-orm/pg-core";
import { appSchema, baseSchema } from "./base";
import { serviceOrders } from "./service-order";

export const ratingEnum = appSchema.enum("rating", ratings);

export const satisfactions = appSchema.table("ratings", {
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

export const satisfactionsRelations = relations(satisfactions, ({ one }) => ({
  serviceOrder: one(serviceOrders, {
    fields: [satisfactions.serviceOrderId],
    references: [serviceOrders.id],
  }),
}));

export type PgSatisfactionsModel = typeof satisfactions.$inferSelect;

export type PgSatisfactionsInsertModel = typeof satisfactions.$inferInsert;
