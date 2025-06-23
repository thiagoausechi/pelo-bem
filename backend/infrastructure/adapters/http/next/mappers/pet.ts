import { calculateAge } from "@core/age";
import type { PetDTO } from "@core/contracts/dtos/pets";
import type { Entry } from "@server/application/gateways/base/gateway";
import type { Owner } from "@server/domain/entities/owner";
import type { Pet } from "@server/domain/entities/pet";
import { env } from "@server/infrastructure/configs/env";
import { mapOwnerToDTO } from "./owner";

export function mapPetToDTO({
  pet,
  owner,
}: {
  pet: Entry<Pet>;
  owner: Entry<Owner>;
}): PetDTO {
  return {
    id: pet.id,
    picture: `${env.S3_PUBLIC_URL}/pets/${pet.id}.png`,
    name: pet.name,
    specie: pet.specie,
    breed: pet.breed,
    age: calculateAge(pet.birthday),
    birthday: pet.birthday,
    weightKg: pet.weightKg,
    heightCm: pet.heightCm,
    gender: pet.gender,
    createdAt: pet.createdAt,
    updatedAt: pet.updatedAt,

    owner: mapOwnerToDTO(owner),
  };
}
