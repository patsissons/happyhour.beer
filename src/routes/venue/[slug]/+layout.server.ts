import { venues } from '$lib/server/venues';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const venue = venues[params.slug as keyof typeof venues];
  const allTags = venue?.happyHours.flatMap((happyHour) => happyHour.tags || []);

  return {
    venue,
    allTags,
  };
};
