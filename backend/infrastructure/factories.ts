import {
  NextJsOwnersController,
  NextJsPetsController,
} from "./adapters/http/next/controllers";
import { env } from "./configs/env";
import { PgOwnerGateway, PgPetGateway } from "./persistence/drizzle/gateways";
import { s3 } from "./persistence/s3";
import { S3FileStorageGateway } from "./persistence/s3/gateways";
import { ZodEmailValidator, ZodPhoneValidator } from "./validators/zod";

const globalForDependencies = globalThis as Record<string, unknown>;

function getOrCreate<T>(key: string, creator: () => T): T {
  const instance = globalForDependencies[key] ?? creator();

  if (env.NODE_ENV !== "production") globalForDependencies[key] = instance;

  return instance as T;
}

export const Validators = {
  emailValidator: getOrCreate("emailValidator", () => new ZodEmailValidator()),
  phoneValidator: getOrCreate("phoneValidator", () => new ZodPhoneValidator()),
};

export const Gateways = {
  ownerGateway: getOrCreate(
    "ownerGateway",
    () => new PgOwnerGateway(Validators),
  ),
  petGateway: getOrCreate("petGateway", () => new PgPetGateway()),
  fileStorage: getOrCreate(
    "fileStorage",
    () => new S3FileStorageGateway(s3, env.S3_BUCKET_NAME),
  ),
};

export const Controllers = {
  ownersController: getOrCreate(
    "ownersController",
    () => new NextJsOwnersController({ ...Validators, ...Gateways }),
  ),
  petsController: getOrCreate(
    "petsController",
    () => new NextJsPetsController({ ...Validators, ...Gateways }),
  ),
};
