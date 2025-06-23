import { z } from "zod";

export const ownerDtoSchema = z.object({
  id: z.string(),
  profile: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type OwnerDTO = z.infer<typeof ownerDtoSchema>;
