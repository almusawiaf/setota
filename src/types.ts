export type VehicleCategory = 
  | 'RO_WATER'
  | 'GAS_CYLINDER'
  | 'VEGETABLES_FRUITS'
  | 'OLD_ITEMS'
  | 'WATERMELON'
  | 'LIVE_CHICKEN'
  | 'SWEETS_COTTON_CANDY'
  | 'HOT_BREAD'
  | 'FRESH_FISH'
  | 'HOME_REPAIRS_CARGO';

export interface CategoryInfo {
  id: VehicleCategory;
  nameAr: string;
  nameEn: string;
  emoji: string;
  iconName: string;
  color: string;
  bgLight: string;
  description: string;
  unit: string;
}

export interface PriceItem {
  id: string;
  itemName: string;
  priceIqd: number;
  unit: string;
}

export interface Review {
  id: string;
  stootaId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
}

export interface Location {
  lat: number;
  lng: number;
  addressAr?: string;
}

export interface StootaDriver {
  id: string;
  driverName: string;
  phone: string;
  facebookUrl?: string;
  category: VehicleCategory;
  areaName: string;
  workingHours: string;
  isOnline: boolean;
  location: Location;
  rating: number;
  reviewCount: number;
  prices: PriceItem[];
  photoUrl?: string;
  lastActive: string;
  distanceMeters?: number;
}

export type UserRole = 'guest' | 'customer' | 'driver';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location?: Location;
  // Extra fields for Driver
  category?: VehicleCategory;
  areaName?: string;
  workingHours?: string;
  facebookUrl?: string;
  prices?: PriceItem[];
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface ServiceOrder {
  id: string;
  stootaId: string;
  stootaDriverName: string;
  stootaPhone: string;
  category: VehicleCategory;
  customerName: string;
  customerPhone: string;
  customerLocation: Location;
  isDirect: boolean; // Direct (on map active) or Indirect (offline/scheduled)
  items: { itemName: string; quantity: number; unitPrice: number }[];
  totalPriceIqd: number;
  requestedTime: string;
  notes?: string;
  status: OrderStatus;
  driverNote?: string;
  etaMinutes?: number;
  createdAt: string;
  hasBeenReviewed?: boolean;
}

export interface FlutterFile {
  path: string;
  title: string;
  category: 'core' | 'domain' | 'data' | 'presentation' | 'config';
  code: string;
}
