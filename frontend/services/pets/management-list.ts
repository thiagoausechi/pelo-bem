import type { PetDTO } from "@core/contracts/dtos/pets";
import { makeQuery } from "../query";

export const petsManagementListQueryKey = [
  "pets",
  "pets-list",
  "pets-management-list",
] as const;

export const fetchPetsManagementList = makeQuery<PetDTO[]>("/pets");
