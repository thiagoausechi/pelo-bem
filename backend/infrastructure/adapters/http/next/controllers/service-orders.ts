import { createServiceOrderForm } from "@core/contracts/forms/service-order";
import { HttpStatus } from "@core/http";
import type {
  PetGateway,
  ServiceOrderGateway,
  ServiceTypeGateway,
  VeterinarianGateway,
} from "@server/application/gateways";
import { CreateServiceOrderUseCase } from "@server/application/usecases/service-order";
import type { NextRequest, NextResponse } from "next/server";
import { NextJsController } from "./base";

interface Dependecies {
  serviceOrderGateway: ServiceOrderGateway;
  serviceTypeGateway: ServiceTypeGateway;
  petGateway: PetGateway;
  veterinarianGateway: VeterinarianGateway;
}

export class NextJsServiceOrdersController extends NextJsController {
  constructor(private deps: Dependecies) {
    super();
  }
  async handleGetOrder(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
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
