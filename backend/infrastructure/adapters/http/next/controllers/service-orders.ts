import { HttpStatus } from "@core/http";
import type {
  PetGateway,
  ServiceOrderGateway,
  VeterinarianGateway,
} from "@server/application/gateways";
import type { NextRequest, NextResponse } from "next/server";
import { NextJsController } from "./base";

interface Dependecies {
  serviceOrderGateway: ServiceOrderGateway;
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
