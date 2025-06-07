export type Range<T = number> =
  | { exact: T }
  | {
      min?: T;
      max?: T;
    };

export function inRange<T>(value: T, range: Range<T>): boolean {
  if ("exact" in range) return value === range.exact;

  const { min, max } = range;
  return (!min || value >= min) && (!max || value <= max);
}
