import { ApplicationError } from "@server/application/errors";

export class EntryAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super(
      message ??
        "Já existe um registro com o mesmo ID. Tente atualizá-lo ou crie um novo registro com um ID diferente.",
    );
  }
}
