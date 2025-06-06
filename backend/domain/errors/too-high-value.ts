import { DomainError } from "./domain-error";

export class TooHighValueError extends DomainError {
  constructor(propertyName: string, entityName: string) {
    super(
      `A propriedade "${propertyName}" de ${entityName} excede o valor permitido.`,
    );
  }
}
