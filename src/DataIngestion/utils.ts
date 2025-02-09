export function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export function decodeUnicodeEscapes(str: string): string {
  return str.replace(/\\u([\da-fA-F]{4})/g, (_match, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}
