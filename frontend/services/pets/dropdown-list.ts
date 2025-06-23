import { petDtoSchema } from "@core/contracts/dtos/pets";
import { z } from "zod";
import { makeQuery } from "../query";

export const petsDropdownListQueryKey = [
  "pets",
  "pets-list",
  "pets-dropdown-list",
] as const;

export const fetchPetsDropdownList = makeQuery("/pets", z.array(petDtoSchema));
