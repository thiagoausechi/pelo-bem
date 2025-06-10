import { err, ok, type Result } from "@core/result";
import {
  EmptyPropertyError,
  type InvalidArgumentError,
} from "@server/domain/errors";
import type { Email } from "@server/domain/value-objects/email";
import type { Phone } from "@server/domain/value-objects/phone";
import { BaseEntity, type BaseEntityProps } from "../base";

interface OwnerProps extends BaseEntityProps {
  fullname: string;
  email: Email;
  phone: Phone;
}

export class Owner extends BaseEntity {
  public static readonly ENTITY_NAME = "cuidador";

  public readonly fullname: string;
  public readonly email: Email;
  public readonly phone: Phone;

  private constructor(props: OwnerProps) {
    super(Owner.ENTITY_NAME, props);

    this.fullname = props.fullname;
    this.email = props.email;
    this.phone = props.phone;
  }

  public static create(
    props: OwnerProps,
  ): Result<Owner, EmptyPropertyError | InvalidArgumentError> {
    const { fullname } = props;

    if (fullname.length === 0)
      return err(new EmptyPropertyError("Nome Completo", Owner.ENTITY_NAME));

    const owner = new Owner(props);
    return owner.validate() ?? ok(owner);
  }
}
