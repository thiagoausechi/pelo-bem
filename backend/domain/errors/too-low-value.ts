import { DomainError } from "./domain-error";

export class TooLowValueError extends DomainError {
  constructor(propertyName: string, entityName: string) {
    super(
      `A propriedade "${propertyName}" de ${entityName} está abaixo do valor permitido.`,
    );
  }
}
