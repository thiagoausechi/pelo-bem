export const ratings = [
  "EXCELLENT",
  "GOOD",
  "AVERAGE",
  "POOR",
  "TERRIBLE",
] as const;

export type Rating = (typeof ratings)[number];

export interface RatingInfo {
  label: string;
  score: number;
}

export const RatingsInfo: Record<Rating, RatingInfo> = {
  EXCELLENT: {
    label: "Excelente",
    score: 5,
  },
  GOOD: {
    label: "Bom",
    score: 4,
  },
  AVERAGE: {
    label: "Médio",
    score: 3,
  },
  POOR: {
    label: "Ruim",
    score: 2,
  },
  TERRIBLE: {
    label: "Terrível",
    score: 1,
  },
} as const;
