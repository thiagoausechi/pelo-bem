import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors";
import type { Email } from "@server/domain/value-objects/email";
import type { License } from "@server/domain/value-objects/license";
import type { Phone } from "@server/domain/value-objects/phone";

interface VeterinarianProps {
  id?: string;
  fullname: string;
  licenseNumber: License;
  email: Email;
  phone: Phone;
  profilePicture?: string;
}

export class Veterinarian {
  public static readonly ENTITY_NAME = "veterinário";

  public readonly id?: string;
  public readonly fullname: string;
  public readonly licenseNumber: License;
  public readonly email: Email;
  public readonly phone: Phone;
  public readonly profilePicture?: string;

  private constructor(props: VeterinarianProps) {
    this.id = props.id;
    this.fullname = props.fullname;
    this.licenseNumber = props.licenseNumber;
    this.email = props.email;
    this.phone = props.phone;
    this.profilePicture = props.profilePicture;
  }

  public static create(
    props: VeterinarianProps,
  ): Result<Veterinarian, EmptyPropertyError> {
    const { id, fullname, profilePicture } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", Veterinarian.ENTITY_NAME));

    if (fullname.length === 0)
      return err(
        new EmptyPropertyError("Nome Completo", Veterinarian.ENTITY_NAME),
      );

    if (profilePicture !== undefined && profilePicture.length === 0)
      return err(
        new EmptyPropertyError("Foto de Perfil", Veterinarian.ENTITY_NAME),
      );

    return ok(new Veterinarian({ ...props }));
  }
}
