import { serviceOrderDtoSchema } from "@core/contracts/dtos/service-orders";
import { z } from "zod";
import { makeQuery } from "../query";

export const upcomingServicesListQueryKey = [
  "service-orders",
  "upcoming-services",
  "upcoming-services-list",
] as const;

// TODO: Implementar endpoint específico para "upcoming"
export const fetchUpcomingServicesList = makeQuery(
  "/service-orders/orders",
  z.array(serviceOrderDtoSchema),
);
