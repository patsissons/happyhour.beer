import type { Venue } from '$lib/types';

export const nookOlympicVillage: Venue = {
  slug: 'nook-olympic-village',
  name: 'Nook Olympic Village',
  address: '195 West 2nd Ave.',
  city: 'Vancouver',
  region: 'British Columbia',
  country: 'Canada',

  description: `Casual, modern Italian locale with a bar & serving up pizza, housemade pasta & drinks.`,
  website: 'https://nookrestaurants.com/olympic-village/',
  googlePlaceId: 'ChIJfQrl6U5zhlQRA3S2ozY4fMI ',
  email: 'olympicvillage@nookrestaurants.com',
  phone: '+1-604-428-6248',
  tags: ['Dog Friendly'],
  images: [
    'https://nookrestaurants.com/wp-content/uploads/2023/09/Nook-Olympic-Village-slider-image-1-1-Entrance.jpg',
    'https://nookrestaurants.com/wp-content/uploads/2023/08/Nook-Olympic-Village-slider-image-1-1-Interior.jpg',
    'https://nookrestaurants.com/wp-content/uploads/2023/08/Nook-Olympic-Village-slider-image-1-1-serving.jpg',
    'https://nookrestaurants.com/wp-content/uploads/2023/09/Nook-Olympic-Village-slider-image-1-1-Arugula-Salad.jpg',
    'https://nookrestaurants.com/wp-content/uploads/2023/09/Nook-Olympic-Village-slider-image-1-1-Kitchen.jpg',
  ],
  menus: [
    {
      label: 'Menu',
      url: 'https://nookrestaurants.com/olympic-village-menus/',
    },
  ],
  socials: [
    {
      type: 'facebook',
      url: 'https://www.facebook.com/nookrestaurantsvan',
    },
    {
      type: 'instagram',
      url: 'https://www.instagram.com/nookrestaurant',
    },
  ],
  happyHours: [
    {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      start: '14:00',
      end: '17:00',
      drinks: [
        {
          label: 'Four Winds Huftgold Pilsner (15oz)',
          price: 6,
          type: 'beer',
        },
        {
          label: 'Make Me Happy Red (5oz)',
          price: 8,
          type: 'wine',
        },
        {
          label: 'Make Me Happy White (5oz)',
          price: 8,
          type: 'wine',
        },
        {
          label: 'Make Me Happy Prosecco (5oz)',
          price: 8,
          type: 'champers',
        },
        {
          label: 'Negroni (3oz)',
          price: 11,
          type: 'cocktail',
        },
      ],
    },
    {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'sunday'],
      start: '21:00',
      drinks: [
        {
          label: 'Four Winds Huftgold Pilsner (15oz)',
          price: 6,
          type: 'beer',
        },
        {
          label: 'Make Me Happy Red (5oz)',
          price: 8,
          type: 'wine',
        },
        {
          label: 'Make Me Happy White (5oz)',
          price: 8,
          type: 'wine',
        },
        {
          label: 'Make Me Happy Prosecco (5oz)',
          price: 8,
          type: 'champers',
        },
        {
          label: 'Negroni (3oz)',
          price: 11,
          type: 'cocktail',
        },
      ],
    },
  ],
};
