import { HttpStatus } from "@core/http";
import type { VeterinarianGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { LicenseValidator } from "@server/domain/value-objects/license";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import type { NextRequest, NextResponse } from "next/server";
import { NextJsController } from "./base";

interface Dependencies {
  veterinarianGateway: VeterinarianGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  licenseValidator: LicenseValidator;
  fileStorage: FileStorageGateway;
}

export class NextJsVeterinariansController extends NextJsController {
  constructor(private readonly deps: Dependencies) {
    super();
  }

  async handleGetOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePostOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePutOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handleGetServiceType(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePostServiceType(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePutServiceType(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handleGetSatisfaction(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePostSatisfaction(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }
}
