export type Range<T = number> =
  | { exact: T }
  | { min: T; max?: T }
  | { min?: T; max: T };

export function inRange<T extends number | Date | string>(
  value: T,
  range: Range<T>,
): boolean {
  if ("exact" in range) return value === range.exact;

  const { min, max } = range;
  return (!min || value >= min) && (!max || value <= max);
}
