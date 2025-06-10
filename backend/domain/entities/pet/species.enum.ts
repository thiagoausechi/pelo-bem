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
    weightKg: { min: 0.2, max: 100 },
    heightCm: { min: 10, max: 110 },
  },
  CAT: {
    label: "gato",
    weightKg: { min: 0.05, max: 12 },
    heightCm: { min: 5, max: 30 },
  },
  BIRD: {
    label: "pássaro",
    weightKg: { min: 2, max: 1.5 },
    heightCm: { min: 3, max: 100 },
  },
} as const;
