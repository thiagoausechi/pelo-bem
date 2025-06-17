/**
 * Calcula a idade em anos, meses e dias a partir de uma data de nascimento.
 *
 * @param birthday - A data de nascimento para calcular a idade
 * @returns Uma string formatada com a idade em português brasileiro
 *
 * @remarks
 * A função formata automaticamente o resultado:
 * - Quando há anos, os dias são omitidos da saída
 * - Aplica automaticamente singular/plural conforme necessário
 * - Retorna "0 dias" se a data for igual ou posterior ao dia atual
 *
 * @example
 * Considerando que hoje é 2025-06-17:
 * ```typescript
 * calculateAge(new Date("2020-04-10")); // "5 anos, 2 meses"
 * calculateAge(new Date("2025-05-01")); // "1 mês e 17 dias"
 * calculateAge(new Date("2025-06-10")); // "7 dias"
 * ```
 */
export function calculateAge(birthday: Date): string {
  const today = new Date();
  const ageInMilliseconds = today.getTime() - birthday.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  const years = Math.floor(ageInDays / 365);
  const months = Math.floor((ageInDays % 365) / 30);
  const days = ageInDays % 30;

  let ageString = "";

  if (years > 0) {
    ageString += `${years} ano${years > 1 ? "s" : ""}`;
  }

  if (months > 0) {
    if (ageString) ageString += ", ";
    ageString += `${months} mês${months > 1 ? "es" : ""}`;
  }

  if (days > 0 && years == 0) {
    if (ageString) ageString += " e ";
    ageString += `${days} dia${days > 1 ? "s" : ""}`;
  }

  return ageString || "0 dias";
}
