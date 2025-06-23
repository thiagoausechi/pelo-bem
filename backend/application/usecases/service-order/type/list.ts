import type { ServiceTypeGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { ServiceType } from "@server/domain/entities/service-order";

interface Dependencies {
  serviceTypeGateway: ServiceTypeGateway;
}

interface Request {
  filters?: FiltersFor<ServiceType>;
  options?: ListOptions<keyof ServiceType>;
}

interface Response {
  serviceType: Entry<ServiceType>;
}

export class ListServiceTypesUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const serviceTypes = await this.deps.serviceTypeGateway.listAll(
      request.filters,
      request.options,
    );

    return serviceTypes.map((serviceType) => ({
      serviceType,
    }));
  }
}
