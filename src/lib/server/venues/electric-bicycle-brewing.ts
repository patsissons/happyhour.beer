import type { Venue } from '$lib/types';

export const electricBicycleBrewing: Venue = {
  slug: 'electric-bicycle-brewery',
  name: 'Electric Bicycle Brewery',
  address: '20 East 4th Avenue',
  city: 'Vancouver',
  region: 'British Columbia',
  country: 'Canada',
  description: `An eccentric Vancouver brewery located in the heart of Mt. Pleasant's brewing district. Expect a unique rotating craft beer menu along with grooving music and sushi by Sushi Radio Weds-Sun!`,
  website: 'https://electricbicyclebrewing.com',
  googlePlaceId: 'ChIJbyOmGGBxhlQRTcdQyvFbYMY',
  email: 'info@ebbeer.com',
  phone: '+1-604-709-9939',
  images: [
    'https://electricbicyclebrewing.com/cdn/shop/files/IMG_2728_2_1512x.jpg?v=1614310986',
    'https://electricbicyclebrewing.com/cdn/shop/files/IMG_1900_300x300.jpg?v=1614310987',
    'https://electricbicyclebrewing.com/cdn/shop/files/IMG_2880_300x300.jpg?v=1614310986',
  ],
  menus: [
    {
      label: 'On tap',
      url: 'https://electricbicyclebrewing.com/pages/rotating-beers-on-tap',
    },
    {
      label: 'Other liquids',
      url: 'https://electricbicyclebrewing.com/pages/more-liquids-snacks',
    },
    {
      label: 'Happy Hour',
      url: 'https://electricbicyclebrewing.com/pages/happy-hour',
    },
    {
      label: 'Kapaow! burgers',
      url: 'https://www.kapowburger.com/menu',
    },
  ],
  socials: [
    {
      type: 'facebook',
      url: 'https://www.facebook.com/Electricbicyclebrewing',
    },
    {
      type: 'instagram',
      url: 'https://www.instagram.com/electricbicyclebrewing',
    },
    {
      type: 'twitter',
      url: 'https://twitter.com/ebbvancouver',
    },
  ],
  happyHours: [
    {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      start: '14:00',
      end: '17:00',
      drinks: [
        {
          label: 'All 13oz draft beers',
          price: 5,
          type: 'beer',
        },
      ],
    },
    {
      days: ['sunday'],
      drinks: [
        {
          label: '16oz Pilsners all day',
          price: 5,
          type: 'beer',
        },
      ],
    },
  ],
};
