import { env } from "./configs/env";
import { PgOwnerGateway } from "./persistence/drizzle/gateways/owner";
import { s3 } from "./persistence/s3";
import { S3FileStorageGateway } from "./persistence/s3/gateways";
import { ZodEmailValidator, ZodPhoneValidator } from "./validators/zod";

export const GlobalValidators = {
  emailValidator: new ZodEmailValidator(),
  phoneValidator: new ZodPhoneValidator(),
};

export const GlobalGateways = {
  ownerGateway: new PgOwnerGateway(GlobalValidators),
  fileStorageGateway: new S3FileStorageGateway(s3, env.S3_BUCKET_NAME),
};
