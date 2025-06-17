import type { Gender, Specie } from "../enums/pets";
import type { OwnerDTO } from "./owners";

export interface PetDTO {
  id: string;
  owner: Omit<OwnerDTO, "pets">;
  picture?: string;
  name: string;
  specie: Specie;
  breed: string;
  age: string; // Para visualização, ex: "2 anos"
  birthday: Date; // Para ordenação
  weightKg: number;
  heightCm: number;
  gender: Gender;
}
