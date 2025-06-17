export const species = ["DOG", "CAT", "BIRD"] as const;

export type Specie = (typeof species)[number];

export interface SpecieInfo {
  label: string;
  icon: React.ReactNode;
  weightKg: { min: number; max: number };
  heightCm: { min: number; max: number };
}
