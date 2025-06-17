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
  icon: React.ReactNode;
  score: number;
}
