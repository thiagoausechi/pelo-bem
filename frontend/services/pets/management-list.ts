import { petDtoSchema } from "@core/contracts/dtos/pets";
import { z } from "zod";
import { makeQuery } from "../query";

export const petsManagementListQueryKey = [
  "pets",
  "pets-list",
  "pets-management-list",
] as const;

export const fetchPetsManagementList = makeQuery(
  "/pets",
  z.array(petDtoSchema),
);
