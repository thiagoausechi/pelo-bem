import { DomainError } from "./domain-error";

export class NegativePropertyError extends DomainError {
  constructor(propertyName: string, entityName: string) {
    super(
      `A propriedade "${propertyName}" de ${entityName} não pode ser negativa.`,
    );
  }
}
