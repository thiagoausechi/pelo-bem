import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";

interface Dependencies {
  ownerGateway: OwnerGateway;
  petGateway: PetGateway;
}

interface Request {
  filters?: FiltersFor<Owner>;
  options?: ListOptions<keyof Owner>;
}

interface Response {
  owner: Entry<Owner>;
}

export class ListOwnersUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const owners = await this.deps.ownerGateway.listAll(
      request.filters,
      request.options,
    );

    return owners.map((owner) => ({ owner }));
  }
}
