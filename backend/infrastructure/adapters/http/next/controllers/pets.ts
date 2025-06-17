import { createPetForm } from "@core/contracts/forms/pet";
import { HttpStatus } from "@core/http";
import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { CreatePetUseCase } from "@server/application/usecases/pet";
import type { NextRequest, NextResponse } from "next/server";
import { NextJsController } from "./base";

interface Dependencies {
  ownerGateway: OwnerGateway;
  petGateway: PetGateway;
  fileStorage: FileStorageGateway;
}

export class NextJsPetsController extends NextJsController {
  constructor(private readonly deps: Dependencies) {
    super();
  }

  async handleGet(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePost(request: NextRequest): Promise<NextResponse> {
    if (this.parsePath(request).length > 0)
      return HttpStatus.BAD_REQUEST(
        "Caminho de requisição inválido para o método POST.",
      );

    return this.handleRequest(async () => {
      const parsedFormData = await this.parseRequest(createPetForm, request);

      const useCaseResponse = await new CreatePetUseCase(this.deps).execute(
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
