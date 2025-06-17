import { Angry, Frown, Meh, Smile, SmilePlus } from "lucide-react";
import type { Rating, RatingInfo } from "./rating";

export const RatingsInfo: Record<Rating, RatingInfo> = {
  EXCELLENT: {
    label: "Excelente",
    icon: <SmilePlus className="size-4" />,
    score: 5,
  },
  GOOD: {
    label: "Bom",
    icon: <Smile className="size-4" />,
    score: 4,
  },
  AVERAGE: {
    label: "Médio",
    icon: <Meh className="size-4" />,
    score: 3,
  },
  POOR: {
    label: "Ruim",
    icon: <Frown className="size-4" />,
    score: 2,
  },
  TERRIBLE: {
    label: "Terrível",
    icon: <Angry className="size-4" />,
    score: 1,
  },
} as const;
