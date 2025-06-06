import { capitalize } from "@core/capitalize";
import { ApplicationError } from "./application-error";

export class NotFoundError extends ApplicationError {
  constructor(entity: string) {
    super(`${capitalize(entity)} não encontrado(a)`);
  }
}
