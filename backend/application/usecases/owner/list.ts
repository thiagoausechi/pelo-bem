import type { OwnerGateway, PetGateway } from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import type { Pet } from "@server/domain/entities/pet";

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
  pets: Entry<Pet>[];
}

export class ListOwnersUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const owners = await this.deps.ownerGateway.listAll(
      request.filters,
      request.options,
    );

    const pets = await Promise.all(
      owners.map((owner) =>
        this.deps.petGateway.listAll({ ownerId: owner.id }),
      ),
    );

    return owners.map((owner, index) => ({
      owner,
      pets: pets[index] ?? [],
    }));
  }
}
