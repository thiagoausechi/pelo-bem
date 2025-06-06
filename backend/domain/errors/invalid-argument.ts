import { DomainError } from "./domain-error";

export class InvalidArgumentError extends DomainError {
  constructor(propertyName: string, entityName: string) {
    super(
      `O valor da propriedade "${propertyName}" de ${entityName} é inválido.`,
    );
  }
}
