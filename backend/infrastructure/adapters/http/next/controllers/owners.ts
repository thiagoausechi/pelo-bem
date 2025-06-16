import { createOwnerForm } from "@core/contracts/forms/owners";
import { HttpStatus } from "@core/http";
import type { OwnerGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { CreateOwnerUseCase } from "@server/application/usecases/owner";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { type NextRequest, type NextResponse } from "next/server";
import { NextJsController } from "./base";

interface Dependencies {
  ownerGateway: OwnerGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  fileStorage: FileStorageGateway;
}

export class NextJsOwnersController extends NextJsController {
  constructor(private readonly deps: Dependencies) {
    super();
  }

  async handleGet(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePost(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const parsedFormData = await this.parseRequest(createOwnerForm, request);

      const useCaseResponse = await new CreateOwnerUseCase(this.deps).execute(
        parsedFormData,
      );

      if (!useCaseResponse.ok) throw useCaseResponse.error;

      return HttpStatus.CREATED(useCaseResponse.value);
    });
  }

  async handlePut(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }
}
