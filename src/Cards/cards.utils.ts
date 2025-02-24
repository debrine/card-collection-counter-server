import { Card } from './cards.types';

type CardSetGroup = {
  cards: Card[];
  boosters?: Record<string, Card[]>;
};

type CardSetGroupsById = Record<string, CardSetGroup>;

export function groupCardsBySetAndBooster(cards: Card[]): {
  groupedCards: CardSetGroupsById;
  setIDs: string[];
  boosterIDs: string[];
} {
  const cardSetsById: CardSetGroupsById = {};
  cards.forEach((card) => {
    cardSetsById[card.set.id] ??= { cards: [] };

    if (card.booster) {
      cardSetsById[card.set.id].boosters ??= {};
      const setBoosters = cardSetsById[card.set.id].boosters;

      if (setBoosters == null) {
        return;
      }

      setBoosters[card.booster.id] ??= [];
      setBoosters[card.booster.id].push(card);
    } else {
      cardSetsById[card.set.id].cards.push(card);
    }
  });

  return {
    groupedCards: cardSetsById,
    setIDs: Object.keys(cardSetsById),
    boosterIDs: Object.values(cardSetsById).flatMap((set) =>
      Object.keys(set.boosters ?? {})
    ),
  };
}
