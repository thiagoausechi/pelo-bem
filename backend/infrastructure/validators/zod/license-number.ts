import type { LicenseValidator } from "@server/domain/value-objects/license";
import { z } from "zod";

export class ZodLicenseNumberValidator implements LicenseValidator {
  public isValid(license: string): boolean {
    return z.string().min(10_000).max(99_999).safeParse(license).success;
  }
}
