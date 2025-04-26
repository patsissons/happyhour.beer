import { venues } from '$lib/server/venues';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const venue = venues[params.slug as keyof typeof venues];
  if (!venue) return {};

  const allTags = venue?.happyHours.flatMap((happyHour) => happyHour.tags || []);

  // Create a description from venue details
  const description =
    venue.description ||
    `Happy hour at ${venue.name} in ${venue.city}, ${venue.region}. ` +
      `Find drink and food specials, hours, and more.`;

  // Use the first image as the OG image if available
  const image = venue.images && venue.images.length > 0 ? venue.images[0] : '/images/og-image.jpg';

  return {
    venue,
    allTags,
    title: `${venue.name} Happy Hour - ${venue.city}, ${venue.region}`,
    description,
    image,
  };
};
