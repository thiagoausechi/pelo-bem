import { z } from "zod";
import { genders, species } from "../enums/pets";
import { ownerDtoSchema } from "./owners";

export const petDtoSchema = z.object({
  id: z.string(),
  owner: ownerDtoSchema,
  picture: z.string().optional(),
  name: z.string(),
  specie: z.enum(species),
  breed: z.string(),
  age: z.string(), // Para visualização, ex: "2 anos"
  birthday: z.coerce.date(), // Para ordenação
  weightKg: z.number(),
  heightCm: z.number(),
  gender: z.enum(genders),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PetDTO = z.infer<typeof petDtoSchema>;
