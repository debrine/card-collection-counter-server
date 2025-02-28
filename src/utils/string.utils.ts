export function getFirstMatchConsecutiveWordsFromString(
  string: string
): string | null {
  const wordSearchRegex = /[A-Za-z]+(?:\s+[A-Za-z]+)*/;
  const result = wordSearchRegex.exec(string);

  return result?.[0] ?? null;
}

export function getNumbersFromString(string: string): number[] {
  const numberSearchRegex = /\b\d+\b/g;
  const numberMatches = string.match(numberSearchRegex);
  if (numberMatches == null || numberMatches.length === 0) {
    return [];
  }
  return numberMatches.map((number) => Number(number));
}
