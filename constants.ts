
import { Category, Product, StoreSettings, Banner, User } from './types';

export const STORE_PHONE_NUMBER = "919321064544";
export const STORE_CALL_NUMBER = "919321054644";
export const STORE_NAME = "Discount store Sandhole";

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  minFreeDeliveryAmount: 499,
  deliveryFee: 40,
  logo: undefined
};

export const INITIAL_USERS: User[] = [
  { 
    username: 'sajan@dss.com', 
    password: 'DSS@kaundal@123', 
    role: 'superadmin', 
    name: 'Sajan' 
  },
  { 
    username: 'isha@dss.com', 
    password: 'isha', 
    role: 'editor', 
    name: 'Isha' 
  }
];

export const INITIAL_BANNERS: Banner[] = [
    { id: 'b1', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' },
    { id: 'b2', image: 'https://images.unsplash.com/photo-1604719312566-b7cb0446a3e7?auto=format&fit=crop&q=80&w=600' }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'grains', name: 'दालें और चावल (Grains)' },
  { id: 'spices', name: 'मसाले (Spices)' },
  { id: 'daily', name: 'रोजमर्रा (Daily Needs)' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Grains
  { id: 'atta_ashirvad', name: 'गेहूँ का आटा', englishName: 'Wheat Flour', brand: 'Ashirvaad', price: 350, mrp: 410, unit: '10 kg', stock: 20, categoryId: 'grains', imageSeed: 'wheat' },
  { id: 'atta_local', name: 'गेहूँ का आटा (खुला)', englishName: 'Wheat Flour (Loose)', brand: 'Local Chakki', price: 30, mrp: 35, unit: '1 kg', stock: 50, categoryId: 'grains', imageSeed: 'flour' },
  { id: 'rice_india_gate', name: 'बासमती चावल', englishName: 'Basmati Rice', brand: 'India Gate', price: 120, mrp: 160, unit: '1 kg', stock: 25, categoryId: 'grains', imageSeed: 'rice' },
  { id: 'rice_loose', name: 'दैनिक चावल', englishName: 'Daily Rice', brand: 'Loose', price: 60, mrp: 75, unit: '1 kg', stock: 100, categoryId: 'grains', imageSeed: 'ricebowl' },
  { id: 'dal_moong', name: 'मूंग दाल', englishName: 'Moong Dal', brand: 'Tata Sampann', price: 110, mrp: 145, unit: '1 kg', stock: 30, categoryId: 'grains', imageSeed: 'lentils' },
  
  // Spices
  { id: 'haldi', name: 'हल्दी पाउडर', englishName: 'Turmeric Powder', brand: 'MDH', price: 45, mrp: 55, unit: '200 g', stock: 40, categoryId: 'spices', imageSeed: 'turmeric' },
  { id: 'mirch', name: 'लाल मिर्च पाउडर', englishName: 'Red Chilli Powder', brand: 'Everest', price: 60, mrp: 78, unit: '200 g', stock: 40, categoryId: 'spices', imageSeed: 'chili' },
  { id: 'namak', name: 'नमक', englishName: 'Salt', brand: 'Tata', price: 25, mrp: 30, unit: '1 kg', stock: 60, categoryId: 'spices', imageSeed: 'salt' },

  // Daily Needs
  { id: 'oil_fortune', name: 'सरसों का तेल', englishName: 'Mustard Oil', brand: 'Fortune', price: 160, mrp: 195, unit: '1 L', stock: 20, categoryId: 'daily', imageSeed: 'oil' },
  { id: 'sugar', name: 'चीनी', englishName: 'Sugar', brand: 'Madhur', price: 45, mrp: 55, unit: '1 kg', stock: 50, categoryId: 'daily', imageSeed: 'sugar' },
  { id: 'tea', name: 'चाय पत्ती', englishName: 'Tea', brand: 'Red Label', price: 130, mrp: 155, unit: '250 g', stock: 35, categoryId: 'daily', imageSeed: 'tea' },
  { id: 'soap', name: 'नहाने का साबुन', englishName: 'Bath Soap', brand: 'Dettol', price: 35, mrp: 40, unit: '1 pc', stock: 100, categoryId: 'daily', imageSeed: 'soap' },
];
