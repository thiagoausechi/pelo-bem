import { err, ok, type Result } from "@core/result";
import type { OwnerGateway } from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/entry";
import { Owner } from "@server/domain/entities/owner";
import { Email, type EmailValidator } from "@server/domain/value-objects/email";
import { Phone, type PhoneValidator } from "@server/domain/value-objects/phone";
import { CreationFailedError } from "../errors/creation-failed";

interface Dependencies {
  ownerGateway: OwnerGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
}

interface Request {
  fullname: string;
  email: string;
  phone: string;
  profilePicture?: string;
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

    return ok(createdOwner.value);
  }
}
