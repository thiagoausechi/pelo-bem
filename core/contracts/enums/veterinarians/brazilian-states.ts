export const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export type BrazilianState = (typeof brazilianStates)[number];

export interface BrazilianStateInfo {
  name: string;
  code: BrazilianState;
}

export const BrazilianStatesInfo: Record<BrazilianState, BrazilianStateInfo> = {
  AC: { name: "Acre", code: "AC" },
  AL: { name: "Alagoas", code: "AL" },
  AP: { name: "Amapá", code: "AP" },
  AM: { name: "Amazonas", code: "AM" },
  BA: { name: "Bahia", code: "BA" },
  CE: { name: "Ceará", code: "CE" },
  DF: { name: "Distrito Federal", code: "DF" },
  ES: { name: "Espírito Santo", code: "ES" },
  GO: { name: "Goiás", code: "GO" },
  MA: { name: "Maranhão", code: "MA" },
  MT: { name: "Mato Grosso", code: "MT" },
  MS: { name: "Mato Grosso do Sul", code: "MS" },
  MG: { name: "Minas Gerais", code: "MG" },
  PA: { name: "Pará", code: "PA" },
  PB: { name: "Paraíba", code: "PB" },
  PR: { name: "Paraná", code: "PR" },
  PE: { name: "Pernambuco", code: "PE" },
  PI: { name: "Piauí", code: "PI" },
  RJ: { name: "Rio de Janeiro", code: "RJ" },
  RN: { name: "Rio Grande do Norte", code: "RN" },
  RS: { name: "Rio Grande do Sul", code: "RS" },
  RO: { name: "Rondônia", code: "RO" },
  RR: { name: "Roraima", code: "RR" },
  SC: { name: "Santa Catarina", code: "SC" },
  SP: { name: "São Paulo", code: "SP" },
  SE: { name: "Sergipe", code: "SE" },
  TO: { name: "Tocantins", code: "TO" },
} as const;
