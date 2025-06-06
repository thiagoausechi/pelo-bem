import { DomainError } from "./domain-error";

export class EmptyPropertyError extends DomainError {
  constructor(propertyName: string, entityName: string) {
    super(
      `A propriedade "${propertyName}" de ${entityName} não pode estar vazia.`,
    );
  }
}
