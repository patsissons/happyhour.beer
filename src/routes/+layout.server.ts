import { venueList } from '$lib/server/data';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const allTags = new Set(venueList.flatMap((venue) => venue.tags || []));

  return {
    venues: venueList,
    allTags,
  };
};
