import type { OwnerDTO } from "@core/contracts/dtos/owners";
import { makeQuery } from "../query";

export const ownersManagementListQueryKey = [
  "owners",
  "owners-list",
  "owners-management-list",
] as const;

export const fetchOwnersManagementList = makeQuery<OwnerDTO[]>("/owners");
