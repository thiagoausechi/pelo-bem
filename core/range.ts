export type Range<T = number> = {
  min?: T;
  max?: T;
};

export function inRange<T>(value: T, range: Range<T>): boolean {
  const { min, max } = range;
  return (!min || value >= min) && (!max || value <= max);
}
