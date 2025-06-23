import { ownerDtoSchema } from "@core/contracts/dtos/owners";
import { z } from "zod";
import { makeQuery } from "../query";

export const ownersManagementListQueryKey = [
  "owners",
  "owners-list",
  "owners-management-list",
] as const;

export const fetchOwnersManagementList = makeQuery(
  "/owners",
  z.array(ownerDtoSchema),
);
