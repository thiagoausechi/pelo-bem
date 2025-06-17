export const species = ["DOG", "CAT", "BIRD"] as const;

export type Specie = (typeof species)[number];

export interface SpecieInfo {
  label: string;
  weightKg: { min: number; max: number };
  heightCm: { min: number; max: number };
}

export const SpeciesInfo: Record<Specie, SpecieInfo> = {
  DOG: {
    label: "cachorro",
    weightKg: { min: 0.5, max: 100 },
    heightCm: { min: 10, max: 110 },
  },
  CAT: {
    label: "gato",
    weightKg: { min: 0.3, max: 12 },
    heightCm: { min: 10, max: 35 },
  },
  BIRD: {
    label: "pássaro",
    weightKg: { min: 0.015, max: 15 },
    heightCm: { min: 5, max: 120 },
  },
} as const;
