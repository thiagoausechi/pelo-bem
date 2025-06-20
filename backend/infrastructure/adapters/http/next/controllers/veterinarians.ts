import type { VeterinarianDTO } from "@core/contracts/dtos/veterinarians";
import { HttpStatus } from "@core/http";
import type { VeterinarianGateway } from "@server/application/gateways";
import type { FileStorageGateway } from "@server/application/gateways/file-storage";
import { ListVeterinarianUseCase } from "@server/application/usecases/veterinarian";
import type { EmailValidator } from "@server/domain/value-objects/email";
import type { LicenseValidator } from "@server/domain/value-objects/license";
import type { PhoneValidator } from "@server/domain/value-objects/phone";
import { env } from "@server/infrastructure/configs/env";
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

  async handleGet(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const pathSegments = this.parsePath(request);
      const id = pathSegments.length > 0 ? pathSegments[0] : undefined;

      const useCaseResponse = await new ListVeterinarianUseCase(
        this.deps,
      ).execute({ filters: id! ? { id } : undefined });

      const result: VeterinarianDTO[] = useCaseResponse.map(
        ({ veterinarian }) => ({
          id: veterinarian.id,
          name: veterinarian.fullname,
          email: veterinarian.email.get(),
          phone: veterinarian.phone.get(),
          license: veterinarian.license.get(),
          profile: `${env.S3_PUBLIC_URL}/veterinarians/${veterinarian.id}.png`,
          createdAt: veterinarian.createdAt,
          updatedAt: veterinarian.updatedAt,
        }),
      );

      return HttpStatus.OK(result);
    });
  }

  async handlePost(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }

  async handlePut(_: NextRequest): Promise<NextResponse> {
    return HttpStatus.NOT_IMPLEMENTED();
  }
}
