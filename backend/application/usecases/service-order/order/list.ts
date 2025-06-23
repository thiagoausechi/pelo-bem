import type {
  OwnerGateway,
  PetGateway,
  ServiceOrderGateway,
  ServiceTypeGateway,
  VeterinarianGateway,
} from "@server/application/gateways";
import type {
  Entry,
  FiltersFor,
  ListOptions,
} from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import type { Pet } from "@server/domain/entities/pet";
import {
  Satisfaction,
  type ServiceOrder,
  type ServiceType,
} from "@server/domain/entities/service-order";
import type { Veterinarian } from "@server/domain/entities/veterinarian";

interface Dependencies {
  serviceOrderGateway: ServiceOrderGateway;
  serviceTypeGateway: ServiceTypeGateway;
  veterinarianGateway: VeterinarianGateway;
  petGateway: PetGateway;
  ownerGateway: OwnerGateway;
}

interface Request {
  filters?: FiltersFor<ServiceOrder>;
  options?: ListOptions<keyof ServiceOrder>;
}

interface Response {
  serviceOrder: Entry<ServiceOrder>;
  serviceType: Entry<ServiceType>;
  satisfaction?: Entry<Satisfaction>;
  veterinarian: Entry<Veterinarian>;
  pet: Entry<Pet>;
  owner: Entry<Owner>;
}

export class ListServiceOrdersUserCase {
  private serviceOrders: Entry<ServiceOrder>[] = [];

  constructor(private deps: Dependencies) {}

  async execute(request: Request): Promise<Response[]> {
    this.serviceOrders = await this.deps.serviceOrderGateway.listAll(
      request.filters,
      request.options,
    );

    const [serviceTypes, veterinarians, pets] = await Promise.all([
      Promise.all(this.getServiceTypes()),
      Promise.all(this.getVeterinarians()),
      Promise.all(this.getPets()),
    ]);

    const serviceTypesValues = serviceTypes.map((serviceType) => {
      if (!serviceType.ok) throw serviceType.error;
      return serviceType.value;
    });

    const veterinariansValues = veterinarians.map((veterinarian) => {
      if (!veterinarian.ok) throw veterinarian.error;
      return veterinarian.value;
    });

    const petsValues = pets.map((pet) => {
      if (!pet.ok) throw pet.error;
      return pet.value;
    });

    const owners = await Promise.all(
      petsValues.map(({ ownerId }) =>
        this.deps.ownerGateway.findBy({ id: ownerId }),
      ),
    );

    const ownersValues = owners.map((owner) => {
      if (!owner.ok) throw owner.error;
      return owner.value;
    });

    return this.serviceOrders.map((serviceOrder, index) => {
      // TODO: Retornar aqui ao implementar a funcionalidade de satisfação
      const MOCKED_satisfaction =
        serviceOrder.status !== "COMPLETED"
          ? undefined
          : Satisfaction.create({
              id: serviceOrder.id,
              serviceOrderId: serviceOrder.id,
              rating: "GOOD",
              comment: "Ótimo atendimento!",
              createdAt: serviceOrder.createdAt,
              updatedAt: serviceOrder.updatedAt,
            });

      const satisfaction = MOCKED_satisfaction?.ok
        ? (MOCKED_satisfaction.value as Entry<Satisfaction>)
        : undefined;

      return {
        serviceOrder,
        serviceType: serviceTypesValues[index]!,
        veterinarian: veterinariansValues[index]!,
        pet: petsValues[index]!,
        owner: ownersValues[index]!,
        satisfaction,
      };
    });
  }

  private getServiceTypes() {
    return this.serviceOrders.map(({ serviceTypeId }) =>
      this.deps.serviceTypeGateway.findBy({ id: serviceTypeId }),
    );
  }

  private getVeterinarians() {
    return this.serviceOrders.map(({ veterinarianId }) =>
      this.deps.veterinarianGateway.findBy({ id: veterinarianId }),
    );
  }

  private getPets() {
    return this.serviceOrders.map(({ petId }) =>
      this.deps.petGateway.findBy({ id: petId }),
    );
  }
}
