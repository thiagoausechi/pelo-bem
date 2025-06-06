import { err, ok, type Result } from "@core/result";
import type { EmailValidator } from "./email.validator";
import { InvalidEmailError } from "./invalid-email";

interface EmailProps {
  email: string;
}

interface Dependencies {
  emailValidator: EmailValidator;
}

export class Email {
  private readonly value: string;

  private constructor(props: EmailProps) {
    this.value = props.email;
  }

  public get(): string {
    return this.value;
  }

  public static create(
    props: EmailProps & Dependencies,
  ): Result<Email, InvalidEmailError> {
    const { email, emailValidator } = props;

    if (!emailValidator.isValid(email))
      return err(new InvalidEmailError(email));

    return ok(new Email({ ...props }));
  }
}
