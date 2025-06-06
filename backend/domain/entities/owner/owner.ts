import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  type InvalidArgumentError,
} from "@server/domain/errors";
import type { Email } from "@server/domain/value-objects/email";
import type { Phone } from "@server/domain/value-objects/phone";

interface OwnerProps {
  id?: string;
  fullname: string;
  email: Email;
  phone: Phone;
}

export class Owner {
  public static readonly ENTITY_NAME = "cuidador";

  public readonly id?: string;
  public readonly fullname: string;
  public readonly email: Email;
  public readonly phone: Phone;

  private constructor(props: OwnerProps) {
    this.id = props.id;
    this.fullname = props.fullname;
    this.email = props.email;
    this.phone = props.phone;
  }

  public static create(
    props: OwnerProps,
  ): Result<Owner, EmptyPropertyError | InvalidArgumentError> {
    const { id, fullname } = props;

    if (id !== undefined && id.length === 0)
      return err(new EmptyPropertyError("ID", Owner.ENTITY_NAME));

    if (fullname.length === 0)
      return err(new EmptyPropertyError("Nome Completo", Owner.ENTITY_NAME));

    return ok(new Owner({ ...props }));
  }
}
