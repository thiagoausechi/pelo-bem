import { err, ok, type Result } from "@core/result";
import type { OwnerGateway } from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { Owner } from "@server/domain/entities/owner";
import { Email, type EmailValidator } from "@server/domain/value-objects/email";
import { Phone, type PhoneValidator } from "@server/domain/value-objects/phone";
import { CreationFailedError } from "../errors/creation-failed";

interface Dependencies {
  ownerGateway: OwnerGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  fileStorage: FileStorageGateway;
}

interface Request {
  fullname: string;
  email: string;
  phone: string;
  profilePicture?: File;
}

export class CreateOwnerUseCase {
  private _request!: Request;

  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<Owner>, CreationFailedError>> {
    try {
      this._request = request;
      const email = this.getEmail();
      const phone = this.getPhone();
      const createdOwner = await this.performCreation({ email, phone });

      void this.uploadProfilePicture(createdOwner.id);

      return ok(createdOwner);
    } catch (error) {
      return err(new CreationFailedError(Owner.ENTITY_NAME, error as Error));
    }
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

  private async performCreation({
    email,
    phone,
  }: {
    email: Email;
    phone: Phone;
  }) {
    const owner = Owner.create({ ...this._request, email, phone });
    if (!owner.ok) throw owner.error;

    const createdOwner = await this.deps.ownerGateway.create(owner.value);
    if (!createdOwner.ok) throw createdOwner.error;

    return createdOwner.value;
  }

  private async uploadProfilePicture(ownerId: string) {
    if (!this._request.profilePicture) return;

    await this.deps.fileStorage.upload({
      file: this._request.profilePicture,
      path: `owners/${ownerId}/profile-picture`,
    });
  }
}
