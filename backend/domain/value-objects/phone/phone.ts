import { err, ok, type Result } from "@core/result";
import { InvalidPhoneError } from "./invalid-phone";
import type { PhoneValidator } from "./phone.validator";

interface PhoneProps {
  phone: string;
}

interface Dependencies {
  phoneValidator: PhoneValidator;
}

export class Phone {
  private readonly value: string;

  private constructor(props: PhoneProps) {
    this.value = props.phone;
  }

  public get(): string {
    return this.value;
  }

  public static create(
    props: PhoneProps & Dependencies,
  ): Result<Phone, InvalidPhoneError> {
    const { phone, phoneValidator } = props;

    if (!phoneValidator.isValid(phone))
      return err(new InvalidPhoneError(phone));

    return ok(new Phone({ ...props }));
  }
}
