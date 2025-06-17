import type { OwnerDTO } from "@core/contracts/dtos/owners";
import { makeQuery } from "../query";

export const ownersDropdownListQueryKey = [
  "owners",
  "owners-list",
  "owners-dropdown-list",
] as const;

export const fetchOwnersDropdownList = makeQuery<OwnerDTO[]>("/owners");
