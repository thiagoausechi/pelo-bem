import { veterinarianDtoSchema } from "@core/contracts/dtos/veterinarians";
import { z } from "zod";
import { makeQuery } from "../query";

export const veterinariansManagementListQueryKey = [
  "veterinarians",
  "veterinarians-list",
  "veterinarians-management-list",
] as const;

export const fetchVeterinariansManagementList = makeQuery(
  "/veterinarians",
  z.array(veterinarianDtoSchema),
);
