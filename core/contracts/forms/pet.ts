import { genders } from "@server/domain/entities/pet";
import { z } from "zod";
import { avatarPictureSchema } from "../avatar-picutre";
import { species } from "../enums/pets";

export const createPetForm = z.object({
  ownerId: z.string().min(1, "O cuidador é obrigatório."),
  name: z.string().min(1, "Nome é obrigatório."),
  specie: z.enum(species),
  breed: z.string().min(1, "Raça é obrigatória."),
  birthday: z.coerce.date(),
  weightKg: z.coerce.number().min(0, "Peso deve ser um número positivo."),
  heightCm: z.coerce.number().min(0, "Altura deve ser um número positivo."),
  gender: z.enum(genders),
  picture: avatarPictureSchema.optional(),
});

export type CreatePetFormData = z.infer<typeof createPetForm>;
