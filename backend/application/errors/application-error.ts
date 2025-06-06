export class ApplicationError extends Error {
  public readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;

    // Define o nome da classe como o nome do erro
    this.name = this.constructor.name;
  }
}
