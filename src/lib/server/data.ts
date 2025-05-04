import type { HappyHour, Venue } from '../types';
import { venues } from './venues';

export const venueList = Object.values(venues);

export function hydrateVenue(venue: Venue) {
  if (!venue.tags) venue.tags = [];

  venue.happyHours.forEach((hh) => {
    const tags = new Set(hh.tags);

    if (isLateNight(hh)) {
      tags.add('Late Night');
    }

    hh.tags = Array.from(tags);
  });

  const tags = new Set(venue.tags);
  if (hasLateNight()) {
    tags.add('Late Night');
  }

  venue.tags = Array.from(tags);

  return venue;

  function hasLateNight() {
    return venue.happyHours.some((hh) => {
      if (!hh.start) return false;

      const start = Number(hh.start.split(':').at(0));
      if (start >= 20) return true;

      return false;
    });
  }

  function isLateNight(hh: HappyHour) {
    if (!hh.start && !hh.end) return true;
    if (!hh.start) return false;

    const start = Number(hh.start.split(':').at(0));
    if (start >= 20) return true;

    return false;
  }
}
