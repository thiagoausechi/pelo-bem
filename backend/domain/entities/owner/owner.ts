import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  InvalidArgumentError,
} from "@server/domain/errors";
import type { Email } from "@server/domain/value-objects/email";

interface OwnerProps {
  id?: string;
  fullname: string;
  email: Email;
  phone: string;
  profilePicture?: string;
}

export class Owner {
  public static readonly ENTITY_NAME = "cuidador";

  public readonly id?: string;
  public readonly fullname: string;
  public readonly email: Email;
  public readonly phone: string;
  public readonly profilePicture?: string;

  private constructor(props: OwnerProps) {
    this.id = props.id;
    this.fullname = props.fullname;
    this.email = props.email;
    this.phone = props.phone;
    this.profilePicture = props.profilePicture;
  }

  public static create(
    props: OwnerProps,
  ): Result<Owner, EmptyPropertyError | InvalidArgumentError> {
    const { id, fullname, phone, profilePicture } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", Owner.ENTITY_NAME));

    if (fullname.length === 0)
      return err(new EmptyPropertyError("Nome Completo", Owner.ENTITY_NAME));

    if (phone.length !== 11)
      return err(new InvalidArgumentError("Telefone", Owner.ENTITY_NAME));

    if (profilePicture !== undefined && profilePicture.length === 0)
      return err(new EmptyPropertyError("Foto de Perfil", Owner.ENTITY_NAME));

    return ok(new Owner({ ...props }));
  }
}
