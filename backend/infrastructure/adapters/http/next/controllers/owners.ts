import { HttpStatus } from "@core/http";
import type { OwnerGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { type NextRequest, type NextResponse } from "next/server";

interface Dependencies {
  ownerGateway: OwnerGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  fileStorage: FileStorageGateway;
}

export class NextJsOwnersController {
  constructor(private readonly deps: Dependencies) {}

  async handleGet(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePost(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePut(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }
}
