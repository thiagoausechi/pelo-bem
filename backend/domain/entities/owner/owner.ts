import { err, ok, type Result } from "@core/result";
import { EmptyPropertyError } from "@server/domain/errors/empty-property";
import { InvalidArgumentError } from "@server/domain/errors/invalid-argument";
import type { EmailValidator } from "@server/domain/services/email-validator";

interface OwnerProps {
  id?: string;
  fullname: string;
  email: string;
  phone: string;
  profilePicture?: string;
}

interface Dependencies {
  emailValidator: EmailValidator;
}

export class Owner {
  public static readonly ENTITY_NAME = "cuidador";

  public readonly id?: string;
  public readonly fullname: string;
  public readonly email: string;
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
    props: OwnerProps & Dependencies,
  ): Result<Owner, EmptyPropertyError | InvalidArgumentError> {
    if (props.id !== undefined && props.id.length === 0)
      return err(new EmptyPropertyError("ID", Owner.ENTITY_NAME));

    if (props.fullname.length === 0)
      return err(new EmptyPropertyError("Nome Completo", Owner.ENTITY_NAME));

    if (!props.emailValidator.isValid(props.email))
      return err(new InvalidArgumentError("E-mail", Owner.ENTITY_NAME));

    if (props.phone.length !== 11)
      return err(new InvalidArgumentError("Telefone", Owner.ENTITY_NAME));

    if (props.profilePicture !== undefined && props.profilePicture.length === 0)
      return err(new EmptyPropertyError("Foto de Perfil", Owner.ENTITY_NAME));

    return ok(new Owner({ ...props }));
  }
}
