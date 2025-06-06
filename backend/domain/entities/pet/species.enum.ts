export const Species = {
  DOG: {
    id: "dog",
    label: "cachorro",
    weightKg: { min: 0.2, max: 100 },
    heightCm: { min: 10, max: 110 },
  },
  CAT: {
    id: "cat",
    label: "gato",
    weightKg: { min: 0.05, max: 12 },
    heightCm: { min: 5, max: 30 },
  },
  BIRD: {
    id: "bird",
    label: "pássaro",
    weightKg: { min: 2, max: 1.5 },
    heightCm: { min: 3, max: 100 },
  },
} as const;
Object.freeze(Species);

export type Specie = keyof typeof Species;
