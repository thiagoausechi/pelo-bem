const exceptions = [
  "de",
  "do",
  "da",
  "das",
  "dos",
  "em",
  "para",
  "com",
  "sem",
  "a",
  "o",
  "e",
  "ou",
  "aos",
  "nas",
  "nos",
];

export function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) return str;

  return str
    .split(" ")
    .map((word, index) => {
      // Capitalize a primeira palavra, ou capitalize se não for uma palavra de exceção
      if (index === 0 || !exceptions.includes(word.toLowerCase()))
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

      return word.toLowerCase();
    })
    .join(" ");
}
