export class DomainError extends Error {
  constructor(message: string) {
    super(message);

    // Define o nome da classe como o nome do erro
    this.name = this.constructor.name;
  }
}
