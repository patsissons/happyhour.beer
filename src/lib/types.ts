export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface HappyHourItem {
  label: string;
  price: number;
  type: string;
  notes?: string;
}

export interface HappyHour {
  days: Day[];
  start?: string;
  end?: string;
  drinks?: HappyHourItem[];
  food?: HappyHourItem[];
  notes?: string;
  tags?: string[];
}

export interface Menu {
  label: string;
  url: string;
  image?: string;
}

export interface Social {
  type: 'facebook' | 'instagram' | 'twitter';
  url: string;
}

export interface Venue {
  slug: string;
  name: string;
  address: string;
  city: string;
  region: string;
  regionCode?: string;
  country: string;
  description?: string;
  website?: string;
  googlePlaceId?: string;
  email?: string;
  phone?: string;
  images?: string[];
  menus?: Menu[];
  socials?: Social[];
  happyHours: HappyHour[];
  tags?: string[];
}
