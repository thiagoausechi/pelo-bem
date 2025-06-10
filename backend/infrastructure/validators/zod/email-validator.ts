import type { EmailValidator } from "@server/domain/value-objects/email";
import { z } from "zod";

export class ZodEmailValidator implements EmailValidator {
  public isValid(email: string): boolean {
    return z.string().email().safeParse(email).success;
  }
}
