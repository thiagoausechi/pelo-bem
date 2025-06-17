import type React from "react";

export const genders = ["MALE", "FEMALE"] as const;

export type Gender = (typeof genders)[number];

export interface GenderInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
}
