import { ownerDtoSchema } from "@core/contracts/dtos/owners";
import { z } from "zod";
import { makeQuery } from "../query";

export const ownersDropdownListQueryKey = [
  "owners",
  "owners-list",
  "owners-dropdown-list",
] as const;

export const fetchOwnersDropdownList = makeQuery(
  "/owners",
  z.array(ownerDtoSchema),
);
