import { DomainError } from "@server/domain/errors";

export class InvalidLicenseError extends DomainError {
  constructor(license: string) {
    super(`A licença "${license}" não é válida.`);
  }
}
