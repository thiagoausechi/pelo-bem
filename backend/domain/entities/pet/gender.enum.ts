export const Genders = {
  MALE: {
    id: "male",
    label: "masculino",
  },
  FEMALE: {
    id: "female",
    label: "feminino",
  },
} as const;
Object.freeze(Genders);

export type Gender = keyof typeof Genders;
