import { DomainError } from "@server/domain/errors";

export class InvalidLicenseError extends DomainError {
  constructor(license: string) {
    super(`O número de licença "${license}" não é válido.`);
  }
}
