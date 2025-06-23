import type { PetDTO } from "@core/contracts/dtos/pets";
import { createPetForm } from "@core/contracts/forms/pet";
import { HttpStatus } from "@core/http";
import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { CreatePetUseCase } from "@server/application/usecases/pet";
import { ListPetsUseCase } from "@server/application/usecases/pet/list";
import type { NextRequest, NextResponse } from "next/server";
import { mapPetToDTO } from "../mappers/pet";
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

  async handleGet(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const pathSegments = this.parsePath(request);
      const id = pathSegments.length > 0 ? pathSegments[0] : undefined;

      const useCaseResponse = await new ListPetsUseCase(this.deps).execute({
        filters: id ? { id } : undefined,
      });

      const result: PetDTO[] = useCaseResponse.map((response) =>
        mapPetToDTO(response),
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
