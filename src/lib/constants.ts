import type { Day } from './types';

export const days: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const priceRanges = [
  { label: 'Under $8', min: 0, max: 7.99 },
  { label: 'Under $12', min: 0, max: 11.99 },
  { label: 'Under $16', min: 0, max: 15.99 },
];

export const typeEmojis: Record<'drink' | 'food', Record<string, string>> = {
  drink: {
    beer: '🍺',
    wine: '🍷',
    cocktail: '🍸',
    champers: '🍾',
    default: '🥃',
  },
  food: {
    burger: '🍔',
    pizza: '🍕',
    sushi: '🍣',
    wings: '🍗',
    default: '🍴',
  },
};
