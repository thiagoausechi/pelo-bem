import { err, ok, type Result } from "@core/result";
import type { ServiceTypeGateway } from "@server/application/gateways";
import type { Entry } from "@server/application/gateways/base/gateway";
import { ServiceType } from "@server/domain/entities/service-order";
import { CreationFailedError } from "../../errors/creation-failed";

interface Dependencies {
  serviceTypeGateway: ServiceTypeGateway;
}

interface Request {
  name: string;
  description: string;
  price: number;
}

export class CreateServiceTypeUseCase {
  constructor(private deps: Dependencies) {}

  async execute(
    request: Request,
  ): Promise<Result<Entry<ServiceType>, CreationFailedError>> {
    try {
      const serviceType = ServiceType.create({ ...request });
      if (!serviceType.ok) throw serviceType.error;

      const createdServiceType = await this.deps.serviceTypeGateway.create(
        serviceType.value,
      );
      if (!createdServiceType.ok) throw createdServiceType.error;

      return ok(createdServiceType.value);
    } catch (error) {
      return err(
        new CreationFailedError(ServiceType.ENTITY_NAME, error as Error),
      );
    }
  }
}
