import { ApplicationError } from "@server/application/errors";

export class EntryAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "Já existe um registro com o mesmo ID. Tente atualizá-lo ou crie um novo registro com um ID diferente.",
    );
  }
}
