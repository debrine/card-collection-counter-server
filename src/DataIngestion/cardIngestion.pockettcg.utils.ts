const DIAMOND = '\u25C7';
const STAR = '\u2606';
const CROWN = '\u265B';

export function getRarity(rarity) {
  switch (rarity[0]) {
    case DIAMOND:
      return 'Common';
    default:
      return 'Rare';
  }
}
