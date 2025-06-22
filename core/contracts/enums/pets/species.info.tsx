import { Bird, Cat, Dog } from "lucide-react";
import type { Specie, SpecieInfo } from "./species";

export const SpeciesInfo: Record<Specie, SpecieInfo> = {
  DOG: {
    label: "cachorro",
    icon: Dog,
    weightKg: { min: 0.5, max: 100 },
    heightCm: { min: 10, max: 110 },
  },
  CAT: {
    label: "gato",
    icon: Cat,
    weightKg: { min: 0.3, max: 12 },
    heightCm: { min: 10, max: 35 },
  },
  BIRD: {
    label: "pássaro",
    icon: Bird,
    weightKg: { min: 0.015, max: 15 },
    heightCm: { min: 5, max: 120 },
  },
} as const;
