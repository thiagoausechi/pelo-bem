import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { z } from "zod";

export class ZodPhoneValidator implements PhoneValidator {
  public isValid(phone: string): boolean {
    return z.string().length(11).safeParse(phone).success;
  }
}
