import { ZodEmailValidator, ZodPhoneValidator } from "./validators/zod";

export const GlobalDependencies = {
  emailValidator: new ZodEmailValidator(),
  phoneValidator: new ZodPhoneValidator(),
};
