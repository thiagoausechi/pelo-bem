import { Owner } from "@server/domain/entities/owner";
import { Email, type EmailValidator } from "@server/domain/value-objects/email";
import { Phone, type PhoneValidator } from "@server/domain/value-objects/phone";
import type { PgOwnerInsertModel, PgOwnerModel } from "../models/owner";

interface Dependencies {
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
}

export class PgOwnerMapper {
  constructor(private readonly deps: Dependencies) {}

  async toModel(entity: Owner): Promise<PgOwnerInsertModel> {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email.get(),
      phone: entity.phone.get(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toPartialModel(
    entity: Partial<Owner> & { id: string },
  ): Promise<Partial<PgOwnerInsertModel>> {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email?.get(),
      phone: entity.phone?.get(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgOwnerModel): Promise<Owner> {
    const email = Email.create({
      email: model.email,
      emailValidator: this.deps.emailValidator,
    });
    if (!email.ok) throw email.error;

    const phone = Phone.create({
      phone: model.phone,
      phoneValidator: this.deps.phoneValidator,
    });
    if (!phone.ok) throw phone.error;

    const owner = Owner.create({
      id: model.id,
      fullname: model.fullname,
      email: email.value,
      phone: phone.value,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!owner.ok) throw owner.error;

    return owner.value;
  }
}
