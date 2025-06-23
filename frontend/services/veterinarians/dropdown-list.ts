import { veterinarianDtoSchema } from "@core/contracts/dtos/veterinarians";
import { z } from "zod";
import { makeQuery } from "../query";

export const veterinariansDropdownListQueryKey = [
  "veterinarians",
  "veterinarians-list",
  "veterinarians-dropdown-list",
] as const;

export const fetchVeterinariansDropdownList = makeQuery(
  "/veterinarians",
  z.array(veterinarianDtoSchema),
);
