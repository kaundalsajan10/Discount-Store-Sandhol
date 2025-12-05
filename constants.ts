
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
    { id: 'b1', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600', order: 1 },
    { id: 'b2', image: 'https://images.unsplash.com/photo-1604719312566-b7cb0446a3e7?auto=format&fit=crop&q=80&w=600', order: 2 }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'oils_ghee', name: 'तेल और घी (Oil & Ghee)', image: 'https://images.unsplash.com/photo-1474979266404-7cadd259d300?auto=format&fit=crop&q=80&w=200' },
  { id: 'grains', name: 'दालें और चावल (Grains)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
  { id: 'spices', name: 'मसाले (Spices)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200' },
  { id: 'daily', name: 'रोजमर्रा (Daily Needs)', image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=200' },
  { id: 'namkeen_biscuits', name: 'नमकीन और बिस्कुट (Namkeen & Biscuits)', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=200' },
  { id: 'drinks_juices', name: 'कोल्ड ड्रिंक्स और जूस (Drinks & Juices)', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200' },
  { id: 'gifts', name: 'उपहार (Gifts)', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=200' },
  { id: 'fruits_veg', name: 'फल और सब्जियां (Fruits & Veg)', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200' },
  { id: 'dry_fruits', name: 'सूखे मेवे (Dry Fruits)', image: 'https://images.unsplash.com/photo-1595412154866-105c33a9277d?auto=format&fit=crop&q=80&w=200' },
  { id: 'shampoo_soap', name: 'शैम्पू और साबुन (Personal Care)', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=200' },
  { id: 'home_needs', name: 'घर की जरूरतें (Home Needs)', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=200' },
  { id: 'school_supply', name: 'स्कूल का सामान (School Supply)', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=200' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- Oil & Ghee (Moved from Daily & New Added) ---
  { id: 'og1', name: 'फॉर्च्यून सरसों तेल', englishName: 'Mustard Oil', brand: 'Fortune', price: 155, mrp: 185, unit: '1 L', stock: 60, categoryId: 'oils_ghee', imageSeed: 'mustard_oil' },
  { id: 'og2', name: 'रिफाइंड सोयाबीन तेल', englishName: 'Refined Soyabean Oil', brand: 'Fortune', price: 140, mrp: 160, unit: '1 L', stock: 55, categoryId: 'oils_ghee', imageSeed: 'refined_oil' },
  { id: 'og3', name: 'अमूल घी', englishName: 'Pure Ghee', brand: 'Amul', price: 550, mrp: 620, unit: '1 L', stock: 20, categoryId: 'oils_ghee', imageSeed: 'ghee' },
  { id: 'og4', name: 'फॉर्च्यून सनलाइट', englishName: 'Sunflower Oil', brand: 'Fortune', price: 140, mrp: 165, unit: '1 L', stock: 40, categoryId: 'oils_ghee', imageSeed: 'sunflower_oil' },
  { id: 'og5', name: 'पतंजलि गाय का घी', englishName: 'Cow Ghee', brand: 'Patanjali', price: 650, mrp: 700, unit: '1 L', stock: 25, categoryId: 'oils_ghee', imageSeed: 'cow_ghee' },
  { id: 'og6', name: 'सफोला गोल्ड', englishName: 'Saffola Gold Oil', brand: 'Saffola', price: 170, mrp: 190, unit: '1 L', stock: 30, categoryId: 'oils_ghee', imageSeed: 'saffola' },
  { id: 'og7', name: 'धारा मूंगफली तेल', englishName: 'Groundnut Oil', brand: 'Dhara', price: 190, mrp: 220, unit: '1 L', stock: 20, categoryId: 'oils_ghee', imageSeed: 'groundnut_oil' },
  { id: 'og8', name: 'फिगारो जैतून तेल', englishName: 'Olive Oil', brand: 'Figaro', price: 250, mrp: 299, unit: '100 ml', stock: 15, categoryId: 'oils_ghee', imageSeed: 'olive_oil' },
  { id: 'og9', name: 'डालडा वनस्पति', englishName: 'Vanaspati Ghee', brand: 'Dalda', price: 110, mrp: 130, unit: '1 L', stock: 40, categoryId: 'oils_ghee', imageSeed: 'dalda' },
  { id: 'og10', name: 'तिल का तेल', englishName: 'Sesame Oil', brand: 'Til Sona', price: 180, mrp: 210, unit: '500 ml', stock: 15, categoryId: 'oils_ghee', imageSeed: 'sesame_oil' },

  // --- Grains (Dals & Rice) ---
  { id: 'g1', name: 'आशीर्वाद आटा', englishName: 'Ashirvaad Atta', brand: 'Ashirvaad', price: 410, mrp: 460, unit: '10 kg', stock: 50, categoryId: 'grains', imageSeed: 'flour_sack' },
  { id: 'g2', name: 'बासमती चावल (इंडिया गेट)', englishName: 'Basmati Rice', brand: 'India Gate', price: 120, mrp: 160, unit: '1 kg', stock: 40, categoryId: 'grains', imageSeed: 'basmati_rice' },
  { id: 'g3', name: 'टाटा संपन्न अरहर दाल', englishName: 'Toor Dal', brand: 'Tata Sampann', price: 140, mrp: 180, unit: '1 kg', stock: 30, categoryId: 'grains', imageSeed: 'toor_dal' },
  { id: 'g4', name: 'चना दाल', englishName: 'Chana Dal', brand: 'Loose', price: 90, mrp: 110, unit: '1 kg', stock: 60, categoryId: 'grains', imageSeed: 'chana_dal' },
  { id: 'g5', name: 'मूंग दाल (धुली)', englishName: 'Moong Dal Washed', brand: 'Loose', price: 110, mrp: 130, unit: '1 kg', stock: 45, categoryId: 'grains', imageSeed: 'moong_dal' },
  { id: 'g6', name: 'राजमा चित्रा', englishName: 'Rajma Chitra', brand: 'Loose', price: 130, mrp: 160, unit: '1 kg', stock: 35, categoryId: 'grains', imageSeed: 'rajma' },
  { id: 'g7', name: 'काले चने', englishName: 'Black Chana', brand: 'Loose', price: 85, mrp: 100, unit: '1 kg', stock: 50, categoryId: 'grains', imageSeed: 'black_chana' },
  { id: 'g8', name: 'बेसन', englishName: 'Besan (Gram Flour)', brand: 'Fortune', price: 65, mrp: 80, unit: '500 g', stock: 25, categoryId: 'grains', imageSeed: 'besan' },
  { id: 'g9', name: 'मैदा', englishName: 'Maida', brand: 'Loose', price: 40, mrp: 50, unit: '1 kg', stock: 40, categoryId: 'grains', imageSeed: 'maida' },
  { id: 'g10', name: 'सूजी', englishName: 'Sooji', brand: 'Rajdhani', price: 45, mrp: 55, unit: '500 g', stock: 30, categoryId: 'grains', imageSeed: 'sooji' },

  // --- Spices ---
  { id: 's1', name: 'कैच हल्दी पाउडर', englishName: 'Turmeric Powder', brand: 'Catch', price: 60, mrp: 75, unit: '200 g', stock: 50, categoryId: 'spices', imageSeed: 'turmeric_powder' },
  { id: 's2', name: 'एवरेस्ट लाल मिर्च', englishName: 'Red Chilli Powder', brand: 'Everest', price: 78, mrp: 90, unit: '200 g', stock: 45, categoryId: 'spices', imageSeed: 'red_chilli' },
  { id: 's3', name: 'धनिया पाउडर', englishName: 'Coriander Powder', brand: 'MDH', price: 55, mrp: 65, unit: '200 g', stock: 40, categoryId: 'spices', imageSeed: 'coriander_powder' },
  { id: 's4', name: 'जीरा', englishName: 'Cumin Seeds (Jeera)', brand: 'Loose', price: 120, mrp: 150, unit: '200 g', stock: 30, categoryId: 'spices', imageSeed: 'jeera' },
  { id: 's5', name: 'गरम मसाला', englishName: 'Garam Masala', brand: 'MDH', price: 85, mrp: 100, unit: '100 g', stock: 35, categoryId: 'spices', imageSeed: 'garam_masala' },
  { id: 's6', name: 'टाटा नमक', englishName: 'Salt', brand: 'Tata', price: 25, mrp: 28, unit: '1 kg', stock: 100, categoryId: 'spices', imageSeed: 'salt_packet' },
  { id: 's7', name: 'काली मिर्च', englishName: 'Black Pepper', brand: 'Catch', price: 110, mrp: 130, unit: '100 g', stock: 20, categoryId: 'spices', imageSeed: 'black_pepper' },
  { id: 's8', name: 'हींग', englishName: 'Hing', brand: 'LG', price: 65, mrp: 80, unit: '50 g', stock: 25, categoryId: 'spices', imageSeed: 'hing' },
  { id: 's9', name: 'सरसों के बीज', englishName: 'Mustard Seeds (Rai)', brand: 'Loose', price: 30, mrp: 40, unit: '100 g', stock: 40, categoryId: 'spices', imageSeed: 'mustard_seeds' },
  { id: 's10', name: 'एमडीएच किचन किंग', englishName: 'Kitchen King Masala', brand: 'MDH', price: 75, mrp: 85, unit: '100 g', stock: 30, categoryId: 'spices', imageSeed: 'kitchen_king' },

  // --- Daily Needs (Removed Oils) ---
  { id: 'd4', name: 'टाटा टी प्रीमियम', englishName: 'Tea Leaf', brand: 'Tata Tea', price: 130, mrp: 150, unit: '250 g', stock: 40, categoryId: 'daily', imageSeed: 'tea_packet' },
  { id: 'd5', name: 'चीनी', englishName: 'Sugar', brand: 'Madhur', price: 44, mrp: 55, unit: '1 kg', stock: 80, categoryId: 'daily', imageSeed: 'sugar_bowl' },
  { id: 'd6', name: 'नेस्कैफे कॉफी', englishName: 'Classic Coffee', brand: 'Nescafe', price: 160, mrp: 180, unit: '50 g', stock: 30, categoryId: 'daily', imageSeed: 'coffee_jar' },
  { id: 'd7', name: 'अमूल मक्खन', englishName: 'Butter', brand: 'Amul', price: 54, mrp: 58, unit: '100 g', stock: 25, categoryId: 'daily', imageSeed: 'butter_block' },
  { id: 'd8', name: 'ब्रेड', englishName: 'White Bread', brand: 'Britannia', price: 45, mrp: 50, unit: '1 pkt', stock: 15, categoryId: 'daily', imageSeed: 'bread' },
  { id: 'd9', name: 'अंडे', englishName: 'Eggs', brand: 'Farm', price: 75, mrp: 90, unit: '12 pcs', stock: 30, categoryId: 'daily', imageSeed: 'eggs' },
  { id: 'd10', name: 'दूध (टेट्रा पैक)', englishName: 'Taza Milk', brand: 'Amul', price: 68, mrp: 72, unit: '1 L', stock: 20, categoryId: 'daily', imageSeed: 'milk_carton' },
  { id: 'd11', name: 'पोहा', englishName: 'Poha', brand: 'Rajdhani', price: 45, mrp: 50, unit: '500 g', stock: 40, categoryId: 'daily', imageSeed: 'poha' },
  { id: 'd12', name: 'सोया बड़ी', englishName: 'Soya Chunks', brand: 'Nutrela', price: 55, mrp: 60, unit: '200 g', stock: 40, categoryId: 'daily', imageSeed: 'soya_chunks' },
  { id: 'd13', name: 'शहद', englishName: 'Honey', brand: 'Dabur', price: 190, mrp: 210, unit: '500 g', stock: 20, categoryId: 'daily', imageSeed: 'honey' },

  // --- Namkeen & Biscuits ---
  { id: 'n1', name: 'पारले-जी', englishName: 'Parle-G', brand: 'Parle', price: 10, mrp: 10, unit: '1 pkt', stock: 100, categoryId: 'namkeen_biscuits', imageSeed: 'parle_g' },
  { id: 'n2', name: 'गुड डे काजू', englishName: 'Good Day Cashew', brand: 'Britannia', price: 30, mrp: 35, unit: '1 pkt', stock: 50, categoryId: 'namkeen_biscuits', imageSeed: 'good_day' },
  { id: 'n3', name: 'मैरी गोल्ड', englishName: 'Marie Gold', brand: 'Britannia', price: 25, mrp: 30, unit: '1 pkt', stock: 45, categoryId: 'namkeen_biscuits', imageSeed: 'marie_gold' },
  { id: 'n4', name: 'ओरियो', englishName: 'Oreo Original', brand: 'Cadbury', price: 35, mrp: 40, unit: '1 pkt', stock: 40, categoryId: 'namkeen_biscuits', imageSeed: 'oreo' },
  { id: 'n5', name: 'हल्दीराम भुजिया', englishName: 'Aloo Bhujia', brand: 'Haldiram', price: 95, mrp: 110, unit: '400 g', stock: 35, categoryId: 'namkeen_biscuits', imageSeed: 'aloo_bhujia' },
  { id: 'n6', name: 'मूंग दाल नमकीन', englishName: 'Moong Dal', brand: 'Haldiram', price: 45, mrp: 50, unit: '200 g', stock: 40, categoryId: 'namkeen_biscuits', imageSeed: 'moong_dal_namkeen' },
  { id: 'n7', name: 'खट्टा मीठा', englishName: 'Khatta Meetha', brand: 'Haldiram', price: 55, mrp: 65, unit: '200 g', stock: 30, categoryId: 'namkeen_biscuits', imageSeed: 'khatta_meetha' },
  { id: 'n8', name: 'लेस चिप्स (ब्लू)', englishName: 'Lays Magic Masala', brand: 'Lays', price: 20, mrp: 20, unit: '1 pkt', stock: 60, categoryId: 'namkeen_biscuits', imageSeed: 'lays_blue' },
  { id: 'n9', name: 'कुरकुरे', englishName: 'Kurkure Masala Munch', brand: 'Kurkure', price: 20, mrp: 20, unit: '1 pkt', stock: 60, categoryId: 'namkeen_biscuits', imageSeed: 'kurkure' },
  { id: 'n10', name: 'रस्क (टोस्ट)', englishName: 'Suji Rusk', brand: 'Britannia', price: 45, mrp: 55, unit: '1 pkt', stock: 25, categoryId: 'namkeen_biscuits', imageSeed: 'rusk' },

  // --- Drinks & Juices ---
  { id: 'j1', name: 'कोका कोला', englishName: 'Coca Cola', brand: 'Coke', price: 40, mrp: 45, unit: '750 ml', stock: 40, categoryId: 'drinks_juices', imageSeed: 'coke_bottle' },
  { id: 'j2', name: 'थम्स अप', englishName: 'Thums Up', brand: 'Coke', price: 90, mrp: 95, unit: '2.25 L', stock: 20, categoryId: 'drinks_juices', imageSeed: 'thums_up' },
  { id: 'j3', name: 'माज़ा', englishName: 'Maaza Mango', brand: 'Maaza', price: 65, mrp: 75, unit: '1.2 L', stock: 30, categoryId: 'drinks_juices', imageSeed: 'maaza' },
  { id: 'j4', name: 'लिम्का', englishName: 'Limca', brand: 'Coke', price: 40, mrp: 45, unit: '750 ml', stock: 25, categoryId: 'drinks_juices', imageSeed: 'limca' },
  { id: 'j5', name: 'स्प्राइट', englishName: 'Sprite', brand: 'Coke', price: 90, mrp: 95, unit: '2.25 L', stock: 20, categoryId: 'drinks_juices', imageSeed: 'sprite' },
  { id: 'j6', name: 'फ्रूटी', englishName: 'Frooti', brand: 'Parle', price: 10, mrp: 10, unit: '160 ml', stock: 100, categoryId: 'drinks_juices', imageSeed: 'frooti' },
  { id: 'j7', name: 'रियल जूस (मिक्स)', englishName: 'Real Mixed Fruit', brand: 'Real', price: 110, mrp: 130, unit: '1 L', stock: 15, categoryId: 'drinks_juices', imageSeed: 'real_juice' },
  { id: 'j8', name: 'बिसलेरी पानी', englishName: 'Mineral Water', brand: 'Bisleri', price: 20, mrp: 20, unit: '1 L', stock: 50, categoryId: 'drinks_juices', imageSeed: 'water_bottle' },
  { id: 'j9', name: 'टाटा ग्लूको', englishName: 'Gluco Plus', brand: 'Tata', price: 10, mrp: 10, unit: '200 ml', stock: 60, categoryId: 'drinks_juices', imageSeed: 'gluco_drink' },
  { id: 'j10', name: 'रेड बुल', englishName: 'Red Bull', brand: 'Red Bull', price: 115, mrp: 125, unit: '250 ml', stock: 10, categoryId: 'drinks_juices', imageSeed: 'red_bull' },

  // --- Gifts (New) ---
  { id: 'gf1', name: 'कैडबरी सेलिब्रेशन्स', englishName: 'Cadbury Celebrations', brand: 'Cadbury', price: 150, mrp: 180, unit: '1 Pack', stock: 30, categoryId: 'gifts', imageSeed: 'celebrations' },
  { id: 'gf2', name: 'फेरेरो रोचर', englishName: 'Ferrero Rocher', brand: 'Ferrero', price: 450, mrp: 499, unit: '16 pcs', stock: 20, categoryId: 'gifts', imageSeed: 'ferrero' },
  { id: 'gf3', name: 'हल्दीराम सोन पापड़ी', englishName: 'Soan Papdi', brand: 'Haldiram', price: 120, mrp: 140, unit: '500 g', stock: 40, categoryId: 'gifts', imageSeed: 'sonpapdi' },
  { id: 'gf4', name: 'बिकानो रसगुल्ला', englishName: 'Rasgulla Tin', brand: 'Bikano', price: 240, mrp: 260, unit: '1 kg', stock: 25, categoryId: 'gifts', imageSeed: 'rasgulla' },
  { id: 'gf5', name: 'गुलाब जामुन टिन', englishName: 'Gulab Jamun', brand: 'Haldiram', price: 230, mrp: 250, unit: '1 kg', stock: 25, categoryId: 'gifts', imageSeed: 'gulab_jamun' },
  { id: 'gf6', name: 'ड्राई फ्रूट बॉक्स', englishName: 'Dry Fruit Gift Box', brand: 'Loose', price: 600, mrp: 800, unit: '500 g', stock: 10, categoryId: 'gifts', imageSeed: 'dryfruit_box' },
  { id: 'gf7', name: 'ब्रिटानिया कुकीज', englishName: 'Cookies Gift Pack', brand: 'Britannia', price: 200, mrp: 250, unit: '1 Pack', stock: 15, categoryId: 'gifts', imageSeed: 'cookies_gift' },
  { id: 'gf8', name: 'रियल जूस पैक', englishName: 'Real Juice Gift Pack', brand: 'Real', price: 220, mrp: 240, unit: '2x1L', stock: 12, categoryId: 'gifts', imageSeed: 'juice_gift' },
  { id: 'gf9', name: 'डेयरी मिल्क सिल्क', englishName: 'Dairy Milk Silk Heart', brand: 'Cadbury', price: 350, mrp: 380, unit: '1 Pack', stock: 10, categoryId: 'gifts', imageSeed: 'silk_heart' },
  { id: 'gf10', name: 'कॉफी मग सेट', englishName: 'Nescafe Coffee Kit', brand: 'Nescafe', price: 300, mrp: 350, unit: '1 Kit', stock: 8, categoryId: 'gifts', imageSeed: 'coffee_kit' },

  // --- Fruits & Veg ---
  { id: 'fv1', name: 'आलू', englishName: 'Potato', brand: 'Farm Fresh', price: 30, mrp: 40, unit: '1 kg', stock: 100, categoryId: 'fruits_veg', imageSeed: 'potato' },
  { id: 'fv2', name: 'प्याज', englishName: 'Onion', brand: 'Farm Fresh', price: 40, mrp: 50, unit: '1 kg', stock: 80, categoryId: 'fruits_veg', imageSeed: 'onion' },
  { id: 'fv3', name: 'टमाटर', englishName: 'Tomato', brand: 'Farm Fresh', price: 50, mrp: 60, unit: '1 kg', stock: 60, categoryId: 'fruits_veg', imageSeed: 'tomato' },
  { id: 'fv4', name: 'केला', englishName: 'Banana', brand: 'Fresh', price: 60, mrp: 70, unit: '1 Dozen', stock: 30, categoryId: 'fruits_veg', imageSeed: 'banana' },
  { id: 'fv5', name: 'सेब (किन्नौरी)', englishName: 'Apple Kinnauri', brand: 'Fresh', price: 150, mrp: 180, unit: '1 kg', stock: 20, categoryId: 'fruits_veg', imageSeed: 'apple' },
  { id: 'fv6', name: 'लहसुन', englishName: 'Garlic', brand: 'Farm Fresh', price: 160, mrp: 200, unit: '1 kg', stock: 15, categoryId: 'fruits_veg', imageSeed: 'garlic' },
  { id: 'fv7', name: 'अदरक', englishName: 'Ginger', brand: 'Farm Fresh', price: 120, mrp: 150, unit: '1 kg', stock: 15, categoryId: 'fruits_veg', imageSeed: 'ginger' },
  { id: 'fv8', name: 'नींबू', englishName: 'Lemon', brand: 'Fresh', price: 100, mrp: 120, unit: '1 kg', stock: 20, categoryId: 'fruits_veg', imageSeed: 'lemon' },
  { id: 'fv9', name: 'हरी मिर्च', englishName: 'Green Chilli', brand: 'Fresh', price: 80, mrp: 100, unit: '1 kg', stock: 20, categoryId: 'fruits_veg', imageSeed: 'green_chilli' },
  { id: 'fv10', name: 'धनिया पत्ता', englishName: 'Coriander Leaves', brand: 'Fresh', price: 20, mrp: 30, unit: '1 bunch', stock: 30, categoryId: 'fruits_veg', imageSeed: 'coriander_leaves' },

  // --- Dry Fruits ---
  { id: 'df1', name: 'बादाम', englishName: 'Almonds', brand: 'Tulsi', price: 850, mrp: 1000, unit: '1 kg', stock: 20, categoryId: 'dry_fruits', imageSeed: 'almonds' },
  { id: 'df2', name: 'काजू', englishName: 'Cashews', brand: 'Tulsi', price: 950, mrp: 1200, unit: '1 kg', stock: 20, categoryId: 'dry_fruits', imageSeed: 'cashews' },
  { id: 'df3', name: 'किशमिश', englishName: 'Raisins', brand: 'Loose', price: 350, mrp: 450, unit: '1 kg', stock: 30, categoryId: 'dry_fruits', imageSeed: 'raisins' },
  { id: 'df4', name: 'अखरोट गिरी', englishName: 'Walnut Kernels', brand: 'Loose', price: 1200, mrp: 1500, unit: '1 kg', stock: 15, categoryId: 'dry_fruits', imageSeed: 'walnuts' },
  { id: 'df5', name: 'पिस्ता', englishName: 'Pistachios', brand: 'Wonderful', price: 1400, mrp: 1600, unit: '1 kg', stock: 10, categoryId: 'dry_fruits', imageSeed: 'pistachio' },
  { id: 'df6', name: 'मखाना', englishName: 'Fox Nuts (Makhana)', brand: 'Loose', price: 800, mrp: 1000, unit: '1 kg', stock: 15, categoryId: 'dry_fruits', imageSeed: 'makhana' },
  { id: 'df7', name: 'खजूर', englishName: 'Dates', brand: 'Lion', price: 150, mrp: 180, unit: '500 g', stock: 40, categoryId: 'dry_fruits', imageSeed: 'dates' },
  { id: 'df8', name: 'नारियल बुरादा', englishName: 'Desiccated Coconut', brand: 'Loose', price: 250, mrp: 300, unit: '1 kg', stock: 25, categoryId: 'dry_fruits', imageSeed: 'coconut_powder' },
  { id: 'df9', name: 'मूंगफली', englishName: 'Peanuts Raw', brand: 'Loose', price: 140, mrp: 160, unit: '1 kg', stock: 40, categoryId: 'dry_fruits', imageSeed: 'peanuts' },
  { id: 'df10', name: 'अंजीर', englishName: 'Anjeer', brand: 'Tulsi', price: 1100, mrp: 1400, unit: '1 kg', stock: 10, categoryId: 'dry_fruits', imageSeed: 'anjeer' },

  // --- Personal Care ---
  { id: 'pc1', name: 'डव साबुन', englishName: 'Dove Soap', brand: 'Dove', price: 65, mrp: 70, unit: '100 g', stock: 40, categoryId: 'shampoo_soap', imageSeed: 'dove_soap' },
  { id: 'pc2', name: 'डेटॉल साबुन', englishName: 'Dettol Soap', brand: 'Dettol', price: 35, mrp: 40, unit: '75 g', stock: 50, categoryId: 'shampoo_soap', imageSeed: 'dettol_soap' },
  { id: 'pc3', name: 'लक्स साबुन', englishName: 'Lux Soap', brand: 'Lux', price: 32, mrp: 38, unit: '100 g', stock: 50, categoryId: 'shampoo_soap', imageSeed: 'lux_soap' },
  { id: 'pc4', name: 'क्लिनिक प्लस शैम्पू', englishName: 'Clinic Plus Shampoo', brand: 'Clinic Plus', price: 120, mrp: 140, unit: '340 ml', stock: 30, categoryId: 'shampoo_soap', imageSeed: 'clinic_plus' },
  { id: 'pc5', name: 'हेड एंड शोल्डर्स', englishName: 'Head & Shoulders', brand: 'P&G', price: 180, mrp: 210, unit: '180 ml', stock: 25, categoryId: 'shampoo_soap', imageSeed: 'shampoo_bottle' },
  { id: 'pc6', name: 'कोलगेट', englishName: 'Colgate Strong Teeth', brand: 'Colgate', price: 60, mrp: 65, unit: '100 g', stock: 40, categoryId: 'shampoo_soap', imageSeed: 'colgate' },
  { id: 'pc7', name: 'क्लोज अप', englishName: 'Close Up Red', brand: 'Close Up', price: 55, mrp: 60, unit: '100 g', stock: 35, categoryId: 'shampoo_soap', imageSeed: 'closeup' },
  { id: 'pc8', name: 'फेयर एंड लवली', englishName: 'Glow & Lovely', brand: 'HUL', price: 85, mrp: 95, unit: '50 g', stock: 30, categoryId: 'shampoo_soap', imageSeed: 'fair_lovely' },
  { id: 'pc9', name: 'पैराशूट तेल', englishName: 'Parachute Coconut Oil', brand: 'Marico', price: 110, mrp: 125, unit: '200 ml', stock: 40, categoryId: 'shampoo_soap', imageSeed: 'parachute_oil' },
  { id: 'pc10', name: 'पॉन्ड्स पाउडर', englishName: 'Ponds Powder', brand: 'Ponds', price: 90, mrp: 105, unit: '100 g', stock: 25, categoryId: 'shampoo_soap', imageSeed: 'ponds_powder' },

  // --- Home Needs ---
  { id: 'hn1', name: 'सर्फ एक्सेल', englishName: 'Surf Excel Easy Wash', brand: 'Surf Excel', price: 130, mrp: 145, unit: '1 kg', stock: 40, categoryId: 'home_needs', imageSeed: 'surf_excel' },
  { id: 'hn2', name: 'टाइड', englishName: 'Tide Plus', brand: 'Tide', price: 110, mrp: 125, unit: '1 kg', stock: 40, categoryId: 'home_needs', imageSeed: 'tide' },
  { id: 'hn3', name: 'विम बार', englishName: 'Vim Dishwash Bar', brand: 'Vim', price: 20, mrp: 25, unit: '1 pc', stock: 60, categoryId: 'home_needs', imageSeed: 'vim_bar' },
  { id: 'hn4', name: 'विम लिक्विड', englishName: 'Vim Gel', brand: 'Vim', price: 105, mrp: 115, unit: '500 ml', stock: 30, categoryId: 'home_needs', imageSeed: 'vim_gel' },
  { id: 'hn5', name: 'हारपिक', englishName: 'Harpic Toilet Cleaner', brand: 'Harpic', price: 95, mrp: 105, unit: '500 ml', stock: 35, categoryId: 'home_needs', imageSeed: 'harpic' },
  { id: 'hn6', name: 'लाइसोल', englishName: 'Lizol Floor Cleaner', brand: 'Lizol', price: 110, mrp: 129, unit: '500 ml', stock: 30, categoryId: 'home_needs', imageSeed: 'lizol' },
  { id: 'hn7', name: 'अगरबत्ती', englishName: 'Agarbatti', brand: 'Cycle', price: 50, mrp: 60, unit: '1 pkt', stock: 50, categoryId: 'home_needs', imageSeed: 'agarbatti' },
  { id: 'hn8', name: 'माचिस', englishName: 'Matchbox', brand: 'Homelite', price: 10, mrp: 10, unit: 'Pack of 5', stock: 100, categoryId: 'home_needs', imageSeed: 'matchbox' },
  { id: 'hn9', name: 'स्क्रबर', englishName: 'Scotch Brite', brand: '3M', price: 20, mrp: 25, unit: '1 pc', stock: 60, categoryId: 'home_needs', imageSeed: 'scrubber' },
  { id: 'hn10', name: 'ओडोनिल', englishName: 'Odonil Block', brand: 'Odonil', price: 55, mrp: 60, unit: '1 pc', stock: 30, categoryId: 'home_needs', imageSeed: 'odonil' },

  // --- School Supply ---
  { id: 'ss1', name: 'नोटबुक (रजिस्टर)', englishName: 'Classmate Notebook', brand: 'Classmate', price: 60, mrp: 75, unit: '1 pc', stock: 50, categoryId: 'school_supply', imageSeed: 'notebook' },
  { id: 'ss2', name: 'ब्लू पेन', englishName: 'Blue Pen (Pack)', brand: 'Cello', price: 25, mrp: 30, unit: '5 pcs', stock: 60, categoryId: 'school_supply', imageSeed: 'pen_blue' },
  { id: 'ss3', name: 'पेंसिल बॉक्स', englishName: 'Apsara Pencils', brand: 'Apsara', price: 50, mrp: 60, unit: '1 box', stock: 40, categoryId: 'school_supply', imageSeed: 'pencil_box' },
  { id: 'ss4', name: 'रबड़', englishName: 'Eraser', brand: 'Nataraj', price: 5, mrp: 5, unit: '1 pc', stock: 100, categoryId: 'school_supply', imageSeed: 'eraser' },
  { id: 'ss5', name: 'शार्पनर', englishName: 'Sharpener', brand: 'Nataraj', price: 5, mrp: 5, unit: '1 pc', stock: 100, categoryId: 'school_supply', imageSeed: 'sharpener' },
  { id: 'ss6', name: 'फेविकोल', englishName: 'Fevicol MR', brand: 'Pidilite', price: 20, mrp: 25, unit: '45 g', stock: 40, categoryId: 'school_supply', imageSeed: 'fevicol' },
  { id: 'ss7', name: 'स्केल (फुट्टा)', englishName: 'Ruler 30cm', brand: 'Camlin', price: 15, mrp: 20, unit: '1 pc', stock: 50, categoryId: 'school_supply', imageSeed: 'ruler' },
  { id: 'ss8', name: 'चार्ट पेपर', englishName: 'Chart Paper', brand: 'Local', price: 10, mrp: 10, unit: '1 pc', stock: 100, categoryId: 'school_supply', imageSeed: 'chart_paper' },
  { id: 'ss9', name: 'कलर बॉक्स', englishName: 'Wax Crayons', brand: 'Camlin', price: 30, mrp: 40, unit: '12 shades', stock: 30, categoryId: 'school_supply', imageSeed: 'crayons' },
  { id: 'ss10', name: 'ज्यामिति बॉक्स', englishName: 'Geometry Box', brand: 'Camlin', price: 120, mrp: 150, unit: '1 box', stock: 20, categoryId: 'school_supply', imageSeed: 'geometry_box' },
];
