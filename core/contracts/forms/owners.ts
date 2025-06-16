import { z } from "zod";

const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_FILE_TYPES = ["image/png"];

export const createOwnerForm = z.object({
  fullname: z.string().min(1, "Nome é obrigatório."),
  email: z.string().min(1, "E-mail é obrigatório."),
  phone: z.string().min(1, "Telefone é obrigatório."),
  profilePicture: z
    .instanceof(File)
    .refine(
      (file) => file.size < MAX_FILE_SIZE_MB * 1024 * 1024,
      `A imagem de perfil deve ter no máximo ${MAX_FILE_SIZE_MB} MB.`,
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      `Apenas formato(s) ${ACCEPTED_FILE_TYPES.map((type) => `.${type.split("/")[1]}`).join(", ")}.`,
    )
    .optional(),
});

export type CreateOwnerFormData = z.infer<typeof createOwnerForm>;
