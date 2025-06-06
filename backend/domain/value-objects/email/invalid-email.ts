import { DomainError } from "@server/domain/errors";

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`O e-mail "${email}" não é válido.`);
  }
}
