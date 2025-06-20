export interface RawLicense {
  licenseNumber: number | string;
  brazilianState: string;
}

export abstract class LicenseValidator {
  public abstract isValid(license: RawLicense): boolean;
}
