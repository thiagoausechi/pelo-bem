import { ApplicationError } from "@server/application/errors";

export class CreationFailedError extends ApplicationError {
  constructor(entityName: string, cause?: Error) {
    super(`Falha ao criar ${entityName}`, cause);
  }
}
