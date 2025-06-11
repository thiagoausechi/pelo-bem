import { ZodEmailValidator, ZodPhoneValidator } from "./validators/zod";

export const GlobalValidators = {
  emailValidator: new ZodEmailValidator(),
  phoneValidator: new ZodPhoneValidator(),
};
