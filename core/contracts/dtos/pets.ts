import type { OwnerDTO } from "./owners";

export interface PetDTO {
  id: string;
  owner: Omit<OwnerDTO, "pets">;
  name: string;
  specie: string;
  breed: string;
  age: {
    label: string; // Para visualização, ex: "2 anos"
    days: number; // Para ordenação
  };
  weightKg: number;
  heightCm: number;
  gender: string;
}
