import { env } from "@server/infrastructure/configs/env";
import { z } from "zod";

const getMaxFileSizeMB = () =>
  typeof window !== "undefined"
    ? env.NEXT_PUBLIC_MAX_FILE_SIZE_MB
    : env.S3_MAX_FILE_SIZE_MB;

export const ACCEPTED_FILE_TYPES = ["image/png"];

export const AVATAR_INPUT_ACCEPT = ACCEPTED_FILE_TYPES.join(", ");

export const avatarPictureSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size < getMaxFileSizeMB() * 1024 * 1024,
    `A imagem deve ter no máximo ${getMaxFileSizeMB()} MB.`,
  )
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    `Apenas formato(s) ${ACCEPTED_FILE_TYPES.map((type) => `.${type.split("/")[1]}`).join(", ")}.`,
  );
