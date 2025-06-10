export const genders = ["MALE", "FEMALE"] as const;

export type Gender = (typeof genders)[number];

export interface GenderInfo {
  id: string;
  label: string;
}

export const GendersInfo: Record<Gender, GenderInfo> = {
  MALE: {
    id: "male",
    label: "masculino",
  },
  FEMALE: {
    id: "female",
    label: "feminino",
  },
} as const;
