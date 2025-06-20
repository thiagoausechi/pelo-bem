import type { BrazilianState } from "@core/contracts/enums/veterinarians";
import { err, ok, type Result } from "@core/result";
import { InvalidLicenseError } from "./invalid-license";
import type { LicenseValidator } from "./license.validator";

interface LicenseProps {
  licenseNumber: number;
  brazilianState: BrazilianState;
}

interface Dependencies {
  licenseValidator: LicenseValidator;
}

export class License {
  private readonly brazilianState: BrazilianState;
  private readonly licenseNumber: number;

  private constructor(props: LicenseProps) {
    this.licenseNumber = props.licenseNumber;
    this.brazilianState = props.brazilianState;
  }

  public get(): string {
    return License.formatLicense({
      licenseNumber: this.licenseNumber,
      brazilianState: this.brazilianState,
    });
  }

  public getLicenseNumber(): number {
    return this.licenseNumber;
  }

  public getBrazilianState(): BrazilianState {
    return this.brazilianState;
  }

  private static formatLicense({
    licenseNumber,
    brazilianState,
  }: LicenseProps): string {
    return `CRMV-${brazilianState} ${licenseNumber.toString().padStart(5, "0")}`;
  }

  public static from(
    params: { license: string } & Dependencies,
  ): Result<License, InvalidLicenseError> {
    const [state, number] = params.license.split(" ");

    if (!state || !number || !/^\d+$/.test(number))
      return err(new InvalidLicenseError(params.license));

    const brazilianState = state.replace("CRMV-", "") as BrazilianState;
    const licenseNumber = parseInt(number, 10);

    return License.create({
      licenseNumber,
      brazilianState,
      licenseValidator: params.licenseValidator,
    });
  }

  public static create(
    props: LicenseProps & Dependencies,
  ): Result<License, InvalidLicenseError> {
    const { licenseNumber, brazilianState, licenseValidator } = props;

    if (!licenseValidator.isValid({ licenseNumber, brazilianState }))
      return err(
        new InvalidLicenseError(
          License.formatLicense({ licenseNumber, brazilianState }),
        ),
      );

    return ok(new License({ ...props }));
  }
}
