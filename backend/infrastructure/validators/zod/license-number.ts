import { brazilianStates } from "@core/contracts/enums/veterinarians";
import type {
  LicenseValidator,
  RawLicense,
} from "@server/domain/value-objects/license";
import { z } from "zod";

export class ZodLicenseNumberValidator implements LicenseValidator {
  public isValid(license: RawLicense): boolean {
    const validNumber = z.coerce
      .number()
      .min(10_000)
      .max(99_999)
      .safeParse(license.licenseNumber).success;

    const valideState = z
      .enum(brazilianStates)
      .safeParse(license.brazilianState).success;

    return validNumber && valideState;
  }
}
