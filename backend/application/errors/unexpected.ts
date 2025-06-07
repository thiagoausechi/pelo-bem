import { ApplicationError } from "./application-error";

/**
 * Use esta classe com cuidado, pois ela representa um erro inesperado.
 * Ela deve ser usada apenas quando não houver uma classe de erro mais específica
 * para o erro que ocorreu.
 */
export class UnexpectedError extends ApplicationError {
  constructor(message?: string, cause?: Error) {
    super(message ?? "Ocorreu um erro inesperado.", cause);
  }
}
