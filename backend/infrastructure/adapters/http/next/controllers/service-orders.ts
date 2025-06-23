import type { ServiceOrderDTO } from "@core/contracts/dtos/service-orders";
import { createServiceOrderForm } from "@core/contracts/forms/service-order";
import { HttpStatus } from "@core/http";
import type {
  OwnerGateway,
  PetGateway,
  ServiceOrderGateway,
  ServiceTypeGateway,
  VeterinarianGateway,
} from "@server/application/gateways";
import {
  CreateServiceOrderUseCase,
  ListServiceOrdersUserCase,
} from "@server/application/usecases/service-order";
import type { NextRequest, NextResponse } from "next/server";
import { mapServiceOrderToDTO } from "../mappers/service-order";
import { NextJsController } from "./base";

interface Dependecies {
  serviceOrderGateway: ServiceOrderGateway;
  serviceTypeGateway: ServiceTypeGateway;
  veterinarianGateway: VeterinarianGateway;
  petGateway: PetGateway;
  ownerGateway: OwnerGateway;
}

export class NextJsServiceOrdersController extends NextJsController {
  constructor(private deps: Dependecies) {
    super();
  }

  async handleGetOrder(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const pathSegments = this.parsePath(request);
      const id = pathSegments.length > 1 ? pathSegments[1] : undefined;

      const filters = {
        ...this.sanitizeSearchParams(request),
        id,
      };

      const useCaseResponse = await new ListServiceOrdersUserCase(
        this.deps,
      ).execute({ filters });

      const result: ServiceOrderDTO[] = useCaseResponse.map((response) =>
        mapServiceOrderToDTO(response),
      );

      const response = id ? result[0] : result;

      return HttpStatus.OK(response);
    });
  }

  async handlePostOrder(request: NextRequest): Promise<NextResponse> {
    if (this.parsePath(request).length > 0)
      return HttpStatus.BAD_REQUEST(
        "Caminho de requisição inválido para o método POST.",
      );

    return this.handleRequest(async () => {
      const parsedFormData = await this.parseRequest(
        createServiceOrderForm,
        request,
      );

      const useCaseResponse = await new CreateServiceOrderUseCase(
        this.deps,
      ).execute(parsedFormData);

      if (!useCaseResponse.ok) throw useCaseResponse.error;

      return HttpStatus.CREATED(useCaseResponse.value);
    });
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
