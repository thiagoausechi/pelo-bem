import { PgOwnerGateway } from "./persistence/drizzle/gateways/owner";
import { ZodEmailValidator, ZodPhoneValidator } from "./validators/zod";

export const GlobalValidators = {
  emailValidator: new ZodEmailValidator(),
  phoneValidator: new ZodPhoneValidator(),
};

export const GlobalGateways = {
  ownerGateway: new PgOwnerGateway(GlobalValidators),
};
