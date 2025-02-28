function getStringCharacters(str: string): Array<string | number> {
  const characters: Array<string | number> = [];
  let currentCharacter = '';
  let isDigit = false;

  for (const char of str) {
    const charIsDigit = /\d/.test(char);
    if (charIsDigit !== isDigit && currentCharacter) {
      characters.push(
        isDigit ? parseInt(currentCharacter, 10) : currentCharacter
      );
      currentCharacter = '';
    }
    isDigit = charIsDigit;
    currentCharacter += char;
  }

  if (currentCharacter) {
    characters.push(
      isDigit ? parseInt(currentCharacter, 10) : currentCharacter
    );
  }

  return characters;
}

export function alphanumericComparator(a: string, b: string): number {
  const aCharacters = getStringCharacters(a);
  const bCharacters = getStringCharacters(b);
  const len = Math.min(aCharacters.length, bCharacters.length);

  for (let i = 0; i < len; i++) {
    const aChunk = aCharacters[i];
    const bChunk = bCharacters[i];

    if (typeof aChunk === 'number' && typeof bChunk === 'number') {
      if (aChunk < bChunk) return -1;
      if (aChunk > bChunk) return 1;
    } else if (typeof aChunk === 'string' && typeof bChunk === 'string') {
      const cmp = aChunk.localeCompare(bChunk);
      if (cmp !== 0) return cmp;
    } else {
      return typeof aChunk === 'number' ? -1 : 1;
    }
  }

  return aCharacters.length - bCharacters.length;
}

export function directionalComparator<T>(
  a: T,
  b: T,
  comparator: (a: T, b: T) => number
): { asc: (a: T, b: T) => number; desc: (a: T, b: T) => number } {
  return {
    asc: () => comparator(a, b),
    desc: () => comparator(b, a),
  };
}

export function createMapComparator<T, U>(
  comparator: (a: U, b: U) => number,
  mapFn: (obj: T) => U
): (a: T, b: T) => number {
  return (a, b) => comparator(mapFn(a), mapFn(b));
}
