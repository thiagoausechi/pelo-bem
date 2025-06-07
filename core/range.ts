export type Range<T = number> =
  | { exact: T }
  | { min: T; max?: T }
  | { min?: T; max: T };

/**
 * @description Verifica se um valor está dentro de um intervalo.
 * @template T O tipo do valor e do intervalo. Esta função suporta números, datas e strings. Outros tipos devem ser tratados separadamente.
 * @param value O valor a ser verificado.
 * @param range O intervalo a ser verificado.
 * @returns Verdadeiro se o valor estiver dentro do intervalo, falso caso contrário.
 */
export function inRange<T extends number | Date | string>(
  value: T,
  range: Range<T>,
): boolean {
  if ("exact" in range) return value === range.exact;

  const { min, max } = range;
  return (!min || value >= min) && (!max || value <= max);
}
