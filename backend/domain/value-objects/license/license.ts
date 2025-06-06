import { err, ok, type Result } from "@core/result";
import { InvalidLicenseError } from "./invalid-license";
import type { LicenseValidator } from "./license.validator";

interface LicenseProps {
  license: string;
}

interface Dependencies {
  licenseValidator: LicenseValidator;
}

export class License {
  private readonly value: string;

  private constructor(props: LicenseProps) {
    this.value = props.license;
  }

  public get(): string {
    return this.value;
  }

  public static create(
    props: LicenseProps & Dependencies,
  ): Result<License, InvalidLicenseError> {
    const { license, licenseValidator } = props;

    if (!licenseValidator.isValid(license))
      return err(new InvalidLicenseError(license));

    return ok(new License({ ...props }));
  }
}
