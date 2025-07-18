import { z } from "zod";
import { avatarPictureSchema } from "../avatar-picutre";

export const createOwnerForm = z.object({
  fullname: z.string().min(1, "Nome é obrigatório."),
  email: z.string().min(1, "E-mail é obrigatório."),
  phone: z.string().min(1, "Telefone é obrigatório."),
  profilePicture: avatarPictureSchema.optional(),
});

export type CreateOwnerFormData = z.infer<typeof createOwnerForm>;

export const updateOwnerForm = createOwnerForm.partial().extend({
  id: z.string().min(1, "ID é obrigatório."),
});

export type UpdateOwnerFormData = z.infer<typeof updateOwnerForm>;
