import { err, ok, type Result } from "@core/result";
import type { OwnerGateway } from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/entry";
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
  profilePicture?: Buffer;
}

export class CreateOwnerUseCase {
  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<Owner>, CreationFailedError>> {
    const email = Email.create({
      email: request.email,
      emailValidator: this.deps.emailValidator,
    });

    if (!email.ok)
      return err(new CreationFailedError(Owner.ENTITY_NAME, email.error));

    const phone = Phone.create({
      phone: request.phone,
      phoneValidator: this.deps.phoneValidator,
    });

    if (!phone.ok)
      return err(new CreationFailedError(Owner.ENTITY_NAME, phone.error));

    const owner = Owner.create({
      ...request,
      email: email.value,
      phone: phone.value,
    });

    if (!owner.ok)
      return err(new CreationFailedError(Owner.ENTITY_NAME, owner.error));

    const createdOwner = await this.deps.ownerGateway.create(owner.value);

    if (!createdOwner.ok)
      return err(
        new CreationFailedError(Owner.ENTITY_NAME, createdOwner.error),
      );

    void this.uploadProfilePicture(
      createdOwner.value.id,
      request.profilePicture,
    );

    return ok(createdOwner.value);
  }

  private async uploadProfilePicture(
    ownerId: string,
    profilePicture?: Buffer,
  ): Promise<Result<string, CreationFailedError>> {
    if (!profilePicture)
      return err(new CreationFailedError("imagem de perfil do cuidador"));

    const uploadResult = await this.deps.fileStorage.upload({
      file: profilePicture,
      path: `owners/${ownerId}/profile-picture`,
    });

    if (!uploadResult.ok)
      return err(
        new CreationFailedError(
          "imagem de perfil do cuidador",
          uploadResult.error,
        ),
      );

    return ok(uploadResult.value);
  }
}
