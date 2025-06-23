import { z } from "zod";

export const veterinarianDtoSchema = z.object({
  id: z.string(),
  profile: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  license: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type VeterinarianDTO = z.infer<typeof veterinarianDtoSchema>;
