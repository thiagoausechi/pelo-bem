import type {
  SatisfactionDTO,
  ServiceOrderDTO,
  ServiceTypeDTO,
} from "@core/contracts/dtos/service-orders";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import type { Pet } from "@server/domain/entities/pet";
import type {
  Satisfaction,
  ServiceOrder,
  ServiceType,
} from "@server/domain/entities/service-order";
import type { Veterinarian } from "@server/domain/entities/veterinarian";
import { mapPetToDTO } from "./pet";
import { mapVeterinarianToDTO } from "./veterinarian";

export function mapServiceOrderToDTO({
  serviceOrder,
  serviceType,
  satisfaction,
  veterinarian,
  pet,
  owner,
}: {
  serviceOrder: Entry<ServiceOrder>;
  serviceType: Entry<ServiceType>;
  satisfaction?: Entry<Satisfaction>;
  veterinarian: Entry<Veterinarian>;
  pet: Entry<Pet>;
  owner: Entry<Owner>;
}): ServiceOrderDTO {
  return {
    id: serviceOrder.id,
    pet: mapPetToDTO({ pet, owner }),
    veterinarian: mapVeterinarianToDTO(veterinarian),
    serviceType: mapServiceTypeToDTO(serviceType),
    status: serviceOrder.status,
    satisfaction: mapSatisfactionToDTO(satisfaction),
    appointmentDate: serviceOrder.appointmentDate,
    createdAt: serviceOrder.createdAt,
    updatedAt: serviceOrder.updatedAt,
  } as ServiceOrderDTO;
}

export function mapServiceTypeToDTO(
  serviceType: Entry<ServiceType>,
): ServiceTypeDTO {
  return {
    id: serviceType.id,
    name: serviceType.name,
    description: serviceType.description,
    price: serviceType.price,
    createdAt: serviceType.createdAt,
    updatedAt: serviceType.updatedAt,
  };
}

export function mapSatisfactionToDTO(
  satisfaction?: Entry<Satisfaction>,
): SatisfactionDTO | undefined {
  if (!satisfaction) return undefined;

  return {
    rating: satisfaction.rating,
    comment: satisfaction.comment,
  };
}
