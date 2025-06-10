import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import type { Email } from "@server/domain/value-objects/email";
import type { License } from "@server/domain/value-objects/license";
import type { Phone } from "@server/domain/value-objects/phone";
import { BaseEntity, type BaseEntityProps } from "../base";

interface VeterinarianProps extends BaseEntityProps {
  fullname: string;
  licenseNumber: License;
  email: Email;
  phone: Phone;
}

export class Veterinarian extends BaseEntity {
  public static readonly ENTITY_NAME = "veterinário";

  public readonly fullname: string;
  public readonly licenseNumber: License;
  public readonly email: Email;
  public readonly phone: Phone;

  private constructor(props: VeterinarianProps) {
    super(Veterinarian.ENTITY_NAME, props);

    this.fullname = props.fullname;
    this.licenseNumber = props.licenseNumber;
    this.email = props.email;
    this.phone = props.phone;
  }

  public static create(
    props: VeterinarianProps,
  ): Result<Veterinarian, EmptyPropertyError> {
    const { fullname } = props;

    if (fullname.length === 0)
      return err(
        new EmptyPropertyError("Nome Completo", Veterinarian.ENTITY_NAME),
      );

    const veterinarian = new Veterinarian(props);
    return veterinarian.validate() ?? ok(veterinarian);
  }
}
