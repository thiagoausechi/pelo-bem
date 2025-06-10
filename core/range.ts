export type Range<T = number> =
  | { exact: T }
  | { min: T; max?: T }
  | { min?: T; max: T };

/**
 * @description Transforma os valores de um objeto em intervalos.
 * @example
 * ```typescript
 * type Example = {
 *   name: string;
 *   age: number;
 *   birthDate: Date;
 *   preferences: {
 *     height: number;
 *     weight: number;
 *   };
 * };
 *
 * type TransformedExample = DeepTransformToRange<Example>;
 * // Result:
 * // {
 * //   name: string;
 * //   age: Range<number>;
 * //   birthDate: Range<Date>;
 * //   preferences: {
 * //     height: number; -> Aninhamento não é suportado
 * //     weight: number;
 * //   };
 * // }
 * ```
 */
export type TransformToRange<T extends object> = {
  [K in keyof T]: T[K] extends number
    ? Range<number>
    : T[K] extends Date
      ? Range<Date>
      : T[K];
};

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
