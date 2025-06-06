export abstract class LicenseValidator {
  public abstract isValid(license: string): boolean;
}
