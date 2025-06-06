export const Ratings = {
  EXCELLENT: {
    id: "excellent",
    label: "Excelente",
    score: 5,
  },
  GOOD: {
    id: "good",
    label: "Bom",
    score: 4,
  },
  AVERAGE: {
    id: "average",
    label: "Médio",
    score: 3,
  },
  POOR: {
    id: "poor",
    label: "Ruim",
    score: 2,
  },
  TERRIBLE: {
    id: "terrible",
    label: "Terrível",
    score: 1,
  },
} as const;
Object.freeze(Ratings);

export type Rating = keyof typeof Ratings;
