import { S3Client } from "@aws-sdk/client-s3";
import { env } from "@server/infrastructure/configs/env";

/**
 * Cria uma instância do cliente S3 com as configurações do ambiente.
 * A instância é reutilizada para evitar a criação de múltiplas conexões.
 */
const globalForS3 = globalThis as unknown as {
  s3Client: S3Client | undefined;
};

const s3Client =
  globalForS3.s3Client ??
  new S3Client({
    region: env.S3_REGION,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    endpoint: env.S3_ENDPOINT,
    forcePathStyle: env.S3_FORCE_PATH_STYLE,
  });
if (env.NODE_ENV !== "production") globalForS3.s3Client = s3Client;

export const s3 = s3Client;
