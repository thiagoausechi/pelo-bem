interface Options {
  maxWords?: number;
}

export function acronym(str: string, options?: Options): string {
  if (typeof str !== "string" || str.length === 0) return str;

  return str
    .split(" ")
    .slice(0, options?.maxWords ?? Infinity)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
