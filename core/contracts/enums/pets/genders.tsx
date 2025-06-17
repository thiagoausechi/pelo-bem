import { Mars, Venus } from "lucide-react";
import type React from "react";

export const genders = ["MALE", "FEMALE"] as const;

export type Gender = (typeof genders)[number];

export interface GenderInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const GendersInfo: Record<Gender, GenderInfo> = {
  MALE: {
    id: "male",
    label: "masculino",
    icon: <Mars className="size-4" />,
  },
  FEMALE: {
    id: "female",
    label: "feminino",
    icon: <Venus className="size-4" />,
  },
} as const;
