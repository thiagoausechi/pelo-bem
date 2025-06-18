import { z } from "zod";
import { avatarPictureSchema } from "../avatar-picutre";

export const createVeterinarianForm = z.object({
  fullname: z.string().min(1, "Nome é obrigatório."),
  email: z.string().min(1, "E-mail é obrigatório."),
  phone: z.string().min(1, "Telefone é obrigatório."),
  licenseNumber: z.string().min(1, "Número da licença é obrigatório."),
  profilePicture: avatarPictureSchema.optional(),
});

export type CreateVeterinarianFormData = z.infer<typeof createVeterinarianForm>;
