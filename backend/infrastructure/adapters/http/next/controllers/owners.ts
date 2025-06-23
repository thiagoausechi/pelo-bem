import type { OwnerDTO } from "@core/contracts/dtos/owners";
import { createOwnerForm } from "@core/contracts/forms/owners";
import { HttpStatus } from "@core/http";
import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import {
  CreateOwnerUseCase,
  ListOwnersUseCase,
} from "@server/application/usecases/owner";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { type NextRequest, type NextResponse } from "next/server";
import { mapOwnerToDTO } from "../mappers/owner";
import { NextJsController } from "./base";

interface Dependencies {
  ownerGateway: OwnerGateway;
  petGateway: PetGateway;
  emailValidator: EmailValidator;
  phoneValidator: PhoneValidator;
  fileStorage: FileStorageGateway;
}

export class NextJsOwnersController extends NextJsController {
  constructor(private readonly deps: Dependencies) {
    super();
  }

  async handleGet(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const pathSegments = this.parsePath(request);
      const id = pathSegments.length > 0 ? pathSegments[0] : undefined;

      const useCaseResponse = await new ListOwnersUseCase(this.deps).execute({
        filters: id ? { id } : undefined,
      });

      const result: OwnerDTO[] = useCaseResponse.map(({ owner }) =>
        mapOwnerToDTO(owner),
      );

      const response = id ? result[0] : result;

      return HttpStatus.OK(response);
    });
  }

  async handlePost(request: NextRequest): Promise<NextResponse> {
    if (this.parsePath(request).length > 0)
      return HttpStatus.BAD_REQUEST(
        "Caminho de requisição inválido para o método POST.",
      );

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
