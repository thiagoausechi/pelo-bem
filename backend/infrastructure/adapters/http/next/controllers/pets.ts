import { calculateAge } from "@core/age";
import type { PetDTO } from "@core/contracts/dtos/pets";
import { createPetForm } from "@core/contracts/forms/pet";
import { HttpStatus } from "@core/http";
import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { CreatePetUseCase } from "@server/application/usecases/pet";
import { ListPetsUseCase } from "@server/application/usecases/pet/list";
import { env } from "@server/infrastructure/configs/env";
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

  async handleGet(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const pathSegments = this.parsePath(request);
      const id = pathSegments.length > 0 ? pathSegments[0] : undefined;

      const useCaseResponse = await new ListPetsUseCase(this.deps).execute({
        filters: id ? { id } : undefined,
      });

      // TODO: Criar um mapper para os DTOs
      const result: PetDTO[] = useCaseResponse.map(({ pet, owner }) => ({
        ...pet,
        picture: `${env.S3_PUBLIC_URL}/pets/${pet.id}.png`,
        age: calculateAge(pet.birthday),

        ownerId: undefined,
        owner: {
          ...owner,
          profile: `${env.S3_PUBLIC_URL}/owners/${owner.id}.png`,
          name: owner.fullname,
          email: owner.email.get(),
          phone: owner.phone.get(),
        },
      }));

      return HttpStatus.OK(result);
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
