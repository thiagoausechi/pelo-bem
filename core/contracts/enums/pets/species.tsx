import { Bird, Cat, Dog } from "lucide-react";

export const species = ["DOG", "CAT", "BIRD"] as const;

export type Specie = (typeof species)[number];

export interface SpecieInfo {
  label: string;
  icon: React.ReactNode;
  weightKg: { min: number; max: number };
  heightCm: { min: number; max: number };
}

export const SpeciesInfo: Record<Specie, SpecieInfo> = {
  DOG: {
    label: "cachorro",
    icon: <Dog className="size-4" />,
    weightKg: { min: 0.5, max: 100 },
    heightCm: { min: 10, max: 110 },
  },
  CAT: {
    label: "gato",
    icon: <Cat className="size-4" />,
    weightKg: { min: 0.3, max: 12 },
    heightCm: { min: 10, max: 35 },
  },
  BIRD: {
    label: "pássaro",
    icon: <Bird className="size-4" />,
    weightKg: { min: 0.015, max: 15 },
    heightCm: { min: 5, max: 120 },
  },
} as const;
