
export interface Product {
  id: string;
  name: string;
  englishName?: string;
  brand?: string;
  price: number;
  mrp?: number;
  unit: string;
  stock: number;
  categoryId: string;
  imageSeed: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  image?: string; // New: Category Image
}

export interface Banner {
  id: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  phone: string;
}

export interface StoreSettings {
  minFreeDeliveryAmount: number;
  deliveryFee: number;
  logo?: string; // New: Store Logo
}

export type CartState = Record<string, number>;

// New Authentication Types
export type Role = 'superadmin' | 'editor';

export interface User {
  username: string;
  password: string;
  name: string;
  role: Role;
}
