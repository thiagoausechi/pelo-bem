import { err, ok, type Result } from "@core/result";
import type { VeterinarianGateway } from "@server/application/gateways";
import { EntryAlreadyExistsError } from "@server/application/gateways/base/entry-already-exists";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { Veterinarian } from "@server/domain/entities/veterinarian";
import { Email, type EmailValidator } from "@server/domain/value-objects/email";
import {
  License,
  type LicenseValidator,
} from "@server/domain/value-objects/license";
import { Phone, type PhoneValidator } from "@server/domain/value-objects/phone";
import { CreationFailedError } from "../errors/creation-failed";

interface Dependencies {
  veterinarianGateway: VeterinarianGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  licenseValidator: LicenseValidator;
  fileStorage: FileStorageGateway;
}

interface Request {
  fullname: string;
  email: string;
  phone: string;
  license: string;
  profilePicture?: File;
}

export class CreateVeterinarianUseCase {
  private _request!: Request;

  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<Veterinarian>, CreationFailedError>> {
    try {
      this._request = request;
      const email = this.getEmail();
      const phone = this.getPhone();
      const license = this.getLicense();

      await this.checkUniqueLicense(license);

      const createdVeterinarian = await this.performCreation({
        email,
        phone,
        license,
      });

      void this.uploadProfilePicture(createdVeterinarian.id);

      return ok(createdVeterinarian);
    } catch (error) {
      return err(
        new CreationFailedError(Veterinarian.ENTITY_NAME, error as Error),
      );
    }
  }

  private async checkUniqueLicense(license: License) {
    if (await this.deps.veterinarianGateway.findBy({ license }))
      throw new EntryAlreadyExistsError(
        "Já existe um veterinário com essa licença.",
      );
  }

  private getEmail() {
    const email = Email.create({
      email: this._request.email,
      emailValidator: this.deps.emailValidator,
    });
    if (!email.ok) throw email.error;

    return email.value;
  }

  private getPhone() {
    const phone = Phone.create({
      phone: this._request.phone,
      phoneValidator: this.deps.phoneValidator,
    });
    if (!phone.ok) throw phone.error;

    return phone.value;
  }

  private getLicense() {
    const license = License.from({
      license: this._request.license,
      licenseValidator: this.deps.licenseValidator,
    });
    if (!license.ok) throw license.error;

    return license.value;
  }

  private async performCreation({
    email,
    phone,
    license,
  }: {
    email: Email;
    phone: Phone;
    license: License;
  }) {
    const veterinarian = Veterinarian.create({
      ...this._request,
      email,
      phone,
      license,
    });
    if (!veterinarian.ok) throw veterinarian.error;

    const createdVeterinarian = await this.deps.veterinarianGateway.create(
      veterinarian.value,
    );
    if (!createdVeterinarian.ok) throw createdVeterinarian.error;

    return createdVeterinarian.value;
  }

  private async uploadProfilePicture(ownerId: string) {
    if (!this._request.profilePicture) return;

    await this.deps.fileStorage.upload({
      file: this._request.profilePicture,
      path: `veterinarians/${ownerId}.png`,
    });
  }
}
