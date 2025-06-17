import { Mars, Venus } from "lucide-react";
import type { Gender, GenderInfo } from "./genders";

export const GendersInfo: Record<Gender, GenderInfo> = {
  MALE: {
    label: "masculino",
    icon: <Mars className="size-4" />,
  },
  FEMALE: {
    label: "feminino",
    icon: <Venus className="size-4" />,
  },
} as const;
