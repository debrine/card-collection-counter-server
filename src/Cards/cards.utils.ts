import {
  alphanumericComparator,
  createMapComparator,
  directionalComparator,
} from 'src/utils/compare.utils';
import { Card } from './cards.types';
import {
  getFirstMatchConsecutiveWordsFromString,
  getNumbersFromString,
} from 'src/utils/string.utils';

export type Group<T> = {
  value: string | null;
  sortValue?: string;
  items: T[];
  subGroups?: Group<T>[];
};

type GroupByAccessor<T> = (item: T) => string | null;

type GroupingInstruction<T> = {
  groupBy: GroupByAccessor<T>;
  sortBy: GroupByAccessor<T>;
  kind: string;
};

export function groupCards(cards: Card[]) {
  const groupingInstructions = getCardGroupingInstructions();

  if (cards.length === 0) {
    return {
      value: null,
      items: [],
    };
  }
  const groupMap = createGroupMap(cards, groupingInstructions);
  sortAndConvertSubGroupsToArray(groupMap);

  return groupMap;
}

function createGroupMap<T>(
  items: T[],
  groupByInstructions: GroupingInstruction<T>[]
): Group<T> {
  if (groupByInstructions.length === 0) {
    return {
      value: null,
      items,
    };
  }

  //   const itemMap: Group<T> = {};
  const itemMap: any = {
    value: null,
    items: [],
    subGroups: {},
  };
  items.forEach((item) => {
    const itemGroupings = calculateGroupingValues(item, groupByInstructions);
    let currentMap = itemMap.subGroups;
    itemGroupings.forEach(({ groupValue, sortValue }, index) => {
      currentMap[groupValue] ??= {
        value: groupValue,
        items: [],
        subGroups: {},
        sortValue,
      };

      if (index === itemGroupings.length - 1) {
        currentMap[groupValue].items.push(item);
        return;
      }

      currentMap = currentMap[groupValue].subGroups;
    });
  });

  return itemMap;
}

function calculateGroupingValues<T>(
  item: T,
  groupByInstructions: GroupingInstruction<T>[]
) {
  const itemGroupings: { groupValue: string; sortValue: string }[] = [];
  for (const [index, { groupBy, sortBy }] of groupByInstructions.entries()) {
    if (index === 0 && groupBy(item) == null) {
      throw new Error('Parent group accessor cannot return null');
    }

    const groupValue = groupBy(item);
    const sortValue = sortBy(item) ?? '';

    if (!groupValue) {
      return itemGroupings;
    }

    itemGroupings.push({ groupValue, sortValue });
  }
  return itemGroupings;
}

function getCardGroupingInstructions(): GroupingInstruction<Card>[] {
  return [
    {
      groupBy: (card) => card.set.release_date.split('-')[0],
      sortBy: (card) => card.set.release_date.split('-')[0],
      kind: 'year',
    },
    {
      groupBy: (card) => card.set.name,
      sortBy: (card) => card.set.release_date,
      kind: 'set',
    },
    {
      groupBy: (card) => card.booster?.name ?? null,
      sortBy: (card) => card.booster?.name ?? null,
      kind: 'booster',
    },
  ];
}

function sortAndConvertSubGroupsToArray<T>(group: Group<T>) {
  if (!group.subGroups) {
    return;
  }

  for (const subGroup of Object.values(group.subGroups)) {
    sortAndConvertSubGroupsToArray(subGroup);
  }

  group.subGroups = Object.values(group.subGroups).sort((a, b) => {
    return alphanumericComparator(b.sortValue ?? '', a.sortValue ?? '');
  });
}

export function extractCardSearchDetailsFromSearchString(
  searchString: string
): {
  name: string | null;
  set_number: number | null;
  total_set_count: number | null;
} {
  const name = getFirstMatchConsecutiveWordsFromString(searchString);
  const [set_number = null, total_set_count = null] =
    getNumbersFromString(searchString);

  return {
    name,
    set_number,
    total_set_count,
  };
}
