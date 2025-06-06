import { DomainError } from "@server/domain/errors";

export class InvalidPhoneError extends DomainError {
  constructor(phone: string) {
    super(`O telefone "${phone}" não é válido.`);
  }
}
