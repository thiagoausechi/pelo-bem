import { serviceTypeDtoSchema } from "@core/contracts/dtos/service-orders";
import { z } from "zod";
import { makeQuery } from "../query";

export const serviceTypesDropdownListQueryKey = [
  "service-types",
  "service-types-dropdown-list",
] as const;

export const fetchServiceTypesDropdownList = makeQuery(
  "/service-orders/types",
  z.array(serviceTypeDtoSchema),
);
