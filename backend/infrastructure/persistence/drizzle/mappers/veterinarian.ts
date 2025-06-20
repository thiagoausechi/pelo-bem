import { Veterinarian } from "@server/domain/entities/veterinarian";
import { Email, type EmailValidator } from "@server/domain/value-objects/email";
import {
  License,
  type LicenseValidator,
} from "@server/domain/value-objects/license";
import { Phone, type PhoneValidator } from "@server/domain/value-objects/phone";
import type {
  PgVeterinarianInsertModel,
  PgVeterinarianModel,
} from "../models/veterinarian";

interface Dependencies {
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  licenseValidator: LicenseValidator;
}

export class PgVeterinarianMapper {
  constructor(private readonly deps: Dependencies) {}

  async toModel(entity: Veterinarian): Promise<PgVeterinarianInsertModel> {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email.get(),
      phone: entity.phone.get(),
      license: entity.license.get(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toPartialModel(
    entity: Partial<Veterinarian>,
  ): Promise<Partial<PgVeterinarianInsertModel>> {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email?.get(),
      phone: entity.phone?.get(),
      license: entity.license?.get(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async toEntity(model: PgVeterinarianModel): Promise<Veterinarian> {
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

    const license = License.from({
      license: model.license,
      licenseValidator: this.deps.licenseValidator,
    });
    if (!license.ok) throw license.error;

    const veterinarian = Veterinarian.create({
      id: model.id,
      fullname: model.fullname,
      email: email.value,
      phone: phone.value,
      license: license.value,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    if (!veterinarian.ok) throw veterinarian.error;

    return veterinarian.value;
  }
}
