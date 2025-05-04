import type { HappyHour, Venue } from '$lib/types';

const commonHappyHour: Pick<HappyHour, 'drinks' | 'food'> = {
  drinks: [
    {
      label: 'House Pilsner 16oz',
      price: 6.5,
      type: 'beer',
    },
    {
      label: 'Sauvignon Blanc 5oz',
      price: 9,
      type: 'wine',
    },
    {
      label: 'Cabernet Sauvignon 5oz',
      price: 9.5,
      type: 'wine',
    },
    {
      label: 'Cava 5oz',
      price: 9.5,
      type: 'champers',
    },
  ],
  food: [
    {
      label: 'Aguachile Rojo',
      price: 11,
      type: 'snack',
    },
    {
      label: 'Arrachera Guacamole',
      price: 12.75,
      type: 'snack',
    },
    {
      label: 'Queso Con Chorizo',
      price: 12.75,
      type: 'snack',
    },
  ],
};

export const opheliaOlympicVillage: Venue = {
  slug: 'ophelia-olympic-village',
  name: 'Ophelia',
  address: '165 W 2nd Ave',
  city: 'Vancouver',
  region: 'British Columbia',
  regionCode: 'V5Y 0L8',
  country: 'Canada',
  description: `Mexican cuisine, a weekend brunch menu & cocktails offered in a homey restaurant.`,
  website: 'https://www.opheliakitchen.ca/',
  googlePlaceId: 'ChIJfTQAlSlzhlQRglYOHc_MZpg',
  email: 'hello@opheliakitchen.ca',
  phone: '+1-604-800-5253',
  tags: ['Dog Friendly'],
  images: [
    'https://opheliakitchen.ca/wp-content/uploads/2020/06/IMG_5159-1468x2048.jpg',
    'https://opheliakitchen.ca/wp-content/uploads/2022/10/Ophelia-NoraHamade-1-1536x1097.jpg',
  ],
  menus: [
    {
      label: 'Menu',
      url: 'https://opheliakitchen.ca/menu',
    },
  ],
  socials: [
    {
      type: 'facebook',
      url: 'https://www.facebook.com/weareophelia',
    },
    {
      type: 'instagram',
      url: 'https://www.instagram.com/opheliavancouver/',
    },
  ],
  happyHours: [
    {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      start: '16:00',
      end: '17:30',
      ...commonHappyHour,
    },
    {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'sunday'],
      start: '21:00',
      ...commonHappyHour,
    },
    {
      days: ['saturday', 'sunday'],
      start: '15:00',
      end: '17:30',
      ...commonHappyHour,
    },
    {
      days: ['friday', 'saturday'],
      start: '22:00',
      ...commonHappyHour,
    },
  ],
};
