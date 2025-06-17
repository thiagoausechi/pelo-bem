import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Pet } from "@server/domain/entities/pet";

interface Dependencies {
  ownerGateway: OwnerGateway;
  petGateway: PetGateway;
}

interface Request {
  filters?: FiltersFor<Pet>;
  options?: ListOptions<keyof Pet>;
}

interface Response {
  pets: Entry<Pet>[];
}

export class ListPetsUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response> {
    const pets = await this.deps.petGateway.listAll(
      request.filters,
      request.options,
    );

    return { pets };
  }
}
