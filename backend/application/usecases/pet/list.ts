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
  filters?: FiltersFor<Pet>;
  options?: ListOptions<keyof Pet>;
}

interface Response {
  pet: Entry<Pet>;
  owner: Entry<Owner>;
}

export class ListPetsUseCase {
  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    const pets = await this.deps.petGateway.listAll(
      request.filters,
      request.options,
    );

    const owners = await Promise.all(
      pets.map((pet) => this.deps.ownerGateway.findBy({ id: pet.ownerId })),
    );

    const ownersValues = owners.map((owner) => {
      // Teóricamente este throw nunca irá acontecer
      // mas é necessário para garantir o `.value` no retorno
      if (!owner.ok) throw owner.error;
      return owner.value;
    });

    return pets.map((pet, index) => ({
      pet,
      owner: ownersValues[index]!,
    }));
  }
}
