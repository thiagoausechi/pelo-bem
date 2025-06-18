import type { ServiceOrderGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { ServiceOrder } from "@server/domain/entities/service-order";

interface Dependencies {
  serviceOrderGateway: ServiceOrderGateway;
}

interface Request {
  filters?: FiltersFor<ServiceOrder>;
  options?: ListOptions<keyof ServiceOrder>;
}

interface Response {
  serviceOrder: Entry<ServiceOrder>;
}

export class ListServiceOrdersUserCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const serviceOrders = await this.deps.serviceOrderGateway.listAll(
      request.filters,
      request.options,
    );

    return serviceOrders.map((serviceOrder) => ({
      serviceOrder,
    }));
  }
}
