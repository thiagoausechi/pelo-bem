import type { Range } from "@core/range";
import type { Gender, Pet, Specie } from "@server/domain/entities/pet";
import type { Gateway } from "./base/gateway";

export type SearchPetParams = {
  ownerId: string;
  name: string;
  specie: Specie;
  breed: string;
  birthday: Range<Date>;
  weightKg: Range;
  heightCm: Range;
  gender: Gender;
};

export type PetGateway = Gateway<Pet, SearchPetParams>;
