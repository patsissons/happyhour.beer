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
