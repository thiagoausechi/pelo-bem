import type { VeterinarianDTO } from "@core/contracts/dtos/veterinarians";
import { makeQuery } from "../query";

export const veterinariansManagementListQueryKey = [
  "veterinarians",
  "veterinarians-list",
  "veterinarians-management-list",
] as const;

export const fetchVeterinariansManagementList =
  makeQuery<VeterinarianDTO[]>("/veterinarians");
