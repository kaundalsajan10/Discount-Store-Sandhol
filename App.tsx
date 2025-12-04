
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Search, X, Filter, CheckCircle } from 'lucide-react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartSummary } from './components/CartSummary';
import { AdminPanel } from './components/AdminPanel';
import { BannerCarousel } from './components/BannerCarousel';
import { CategoryGrid } from './components/CategoryGrid';
import { Footer } from './components/Footer';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, DEFAULT_STORE_SETTINGS, INITIAL_BANNERS, INITIAL_USERS } from './constants';
import { CartState, CartItem, Product, StoreSettings, Category, Banner, User } from './types';
import { formatCurrency } from './utils';

const App: React.FC = () => {
  // --- State Initialization ---
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('products') || '') || INITIAL_PRODUCTS; } catch { return INITIAL_PRODUCTS; }
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    try { return JSON.parse(localStorage.getItem('categories') || '') || INITIAL_CATEGORIES; } catch { return INITIAL_CATEGORIES; }
  });
  const [banners, setBanners] = useState<Banner[]>(() => {
    try { return JSON.parse(localStorage.getItem('banners') || '') || INITIAL_BANNERS; } catch { return INITIAL_BANNERS; }
  });
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try { return JSON.parse(localStorage.getItem('storeSettings') || '') || DEFAULT_STORE_SETTINGS; } catch { return DEFAULT_STORE_SETTINGS; }
  });
  const [users, setUsers] = useState<User[]>(() => {
    try { return JSON.parse(localStorage.getItem('users') || '') || INITIAL_USERS; } catch { return INITIAL_USERS; }
  });

  const [cart, setCart] = useState<CartState>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Navigation State
  const [activeCategory, setActiveCategory] = useState<string>(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // --- Persistence ---
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('banners', JSON.stringify(banners)), [banners]);
  useEffect(() => localStorage.setItem('storeSettings', JSON.stringify(storeSettings)), [storeSettings]);
  useEffect(() => localStorage.setItem('users', JSON.stringify(users)), [users]);

  // --- Handlers ---
  const handleAddToCart = (id: string) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const product = products.find(p => p.id === id);
      if (product && currentQty >= product.stock) {
        alert("Out of Stock limit reached");
        return prev;
      }
      return { ...prev, [id]: currentQty + 1 };
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    if (delta > 0) handleAddToCart(id);
    else handleRemoveFromCart(id);
  };

  const handleSetQuantity = (id: string, qty: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    if (qty > product.stock) {
       alert(`Only ${product.stock} available.`);
       setCart(prev => ({ ...prev, [id]: product.stock }));
    } else {
       setCart(prev => ({ ...prev, [id]: qty }));
    }
  };

  // Admin Handlers
  const handleAddProduct = (p: Product) => setProducts(prev => [...prev, p]);
  const handleUpdateProduct = (p: Product) => setProducts(prev => prev.map(x => x.id === p.id ? p : x));
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => { const n = {...prev}; delete n[id]; return n; });
  };
  const handleAddCategory = (c: Category) => setCategories(prev => [...prev, c]);
  const handleUpdateCategory = (c: Category) => setCategories(prev => prev.map(x => x.id === c.id ? c : x));
  const handleDeleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));
  
  const handleAddBanner = (b: Banner) => setBanners(prev => [...prev, b]);
  const handleDeleteBanner = (id: string) => setBanners(prev => prev.filter(b => b.id !== id));
  
  const handleUpdateSettings = (s: StoreSettings) => setStoreSettings(s);
  
  const handleAddUser = (u: User) => setUsers(prev => [...prev, u]);
  const handleDeleteUser = (username: string) => setUsers(prev => prev.filter(u => u.username !== username));

  const handleOrderSuccess = () => { setCart({}); setIsCartOpen(false); setShowSuccessModal(true); };

  // --- Derived State ---
  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { ...product, quantity };
    }).filter((item): item is CartItem => item !== null);
  }, [cart, products]);

  const totalItems = useMemo(() => Object.values(cart).reduce((a: number, b: number) => a + b, 0), [cart]);
  const totalPrice = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => { counts[p.categoryId] = (counts[p.categoryId] || 0) + 1; });
    return counts;
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.englishName && p.englishName.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query))
      );
    } else if (activeCategory) {
      result = result.filter((p) => p.categoryId === activeCategory);
    } else {
        result = result; 
    }

    if (selectedBrand !== 'All') {
        result = result.filter(p => p.brand === selectedBrand);
    }

    return result;
  }, [activeCategory, searchQuery, products, selectedBrand]);

  const availableBrands = useMemo(() => {
      const brands = new Set<string>();
      filteredProducts.forEach(p => { if (p.brand) brands.add(p.brand); });
      return Array.from(brands).sort();
  }, [filteredProducts]);

  // --- Views ---

  if (isAdminOpen) {
    return (
      <AdminPanel 
        products={products} categories={categories} banners={banners} settings={storeSettings} users={users}
        onBack={() => setIsAdminOpen(false)} 
        onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} onUpdateCategory={handleUpdateCategory}
        onAddBanner={handleAddBanner} onDeleteBanner={handleDeleteBanner}
        onUpdateSettings={handleUpdateSettings}
        onAddUser={handleAddUser} onDeleteUser={handleDeleteUser}
      />
    );
  }

  if (isCartOpen) {
    return (
      <CartSummary 
        items={cartItems} settings={storeSettings}
        onBack={() => setIsCartOpen(false)} onUpdateQuantity={handleUpdateQuantity} onSetQuantity={handleSetQuantity}
        onSuccess={handleOrderSuccess}
      />
    );
  }

  const isHomeView = !searchQuery && !activeCategory;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-24">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
             <p className="text-gray-600 mb-6">Order ready on WhatsApp. Please send message there.</p>
             <button onClick={() => setShowSuccessModal(false)} className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl">Back to Home</button>
          </div>
        </div>
      )}

      <Header 
        onAdminClick={() => setIsAdminOpen(true)} 
        onHomeClick={() => { setActiveCategory(""); setSearchQuery(""); }} 
        logo={storeSettings.logo}
      />

      {/* Search */}
      <div className="bg-white p-4 pb-2 sticky top-[60px] z-30 shadow-sm">
        <div className="max-w-3xl mx-auto relative">
          <input 
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"><X size={18} /></button>}
        </div>
      </div>

      <main className="max-w-3xl mx-auto w-full p-4 pt-2">
        
        {/* HERO SECTION (Home Only) */}
        {isHomeView && (
            <>
                <BannerCarousel banners={banners} />
                <CategoryGrid 
                    categories={categories} 
                    onSelect={(id) => setActiveCategory(id)} 
                />
                <h3 className="font-bold text-gray-800 mb-3 text-lg">सभी उत्पाद (All Products)</h3>
            </>
        )}

        {/* Category Tabs */}
        {!isHomeView && !searchQuery && (
            <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar mb-4">
                <button
                    onClick={() => setActiveCategory("")}
                    className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold bg-gray-200 text-gray-700"
                >
                    Home
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        activeCategory === cat.id ? 'bg-orange-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'
                        }`}
                    >
                        {cat.name} ({categoryCounts[cat.id] || 0})
                    </button>
                ))}
            </div>
        )}

        {/* Search Header */}
        {(searchQuery || activeCategory) && (
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    {searchQuery ? `Search: "${searchQuery}"` : categories.find(c => c.id === activeCategory)?.name || 'Products'}
                </h2>
                {/* Brand Filter */}
                {availableBrands.length > 0 && (
                     <div className="flex gap-2 overflow-x-auto max-w-[50%] no-scrollbar">
                        {availableBrands.map(b => (
                            <button key={b} onClick={() => setSelectedBrand(b === selectedBrand ? 'All' : b)}
                                className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${selectedBrand === b ? 'bg-orange-100 border-orange-300 text-orange-800' : 'bg-white'}`}>
                                {b}
                            </button>
                        ))}
                     </div>
                )}
            </div>
        )}
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-3">
            {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No items found.</div>
            ) : (
                filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        quantity={cart[product.id] || 0}
                        onAdd={handleAddToCart}
                        onRemove={handleRemoveFromCart}
                    />
                ))
            )}
        </div>
      </main>
      
      {/* Footer Added Here */}
      <Footer settings={storeSettings} />

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-md animate-fade-in-up">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-orange-800 text-white rounded-xl p-4 shadow-xl flex justify-between items-center hover:bg-orange-900 active:scale-95 transition-all"
          >
             <div className="flex items-center gap-3">
                <div className="bg-white text-orange-800 font-bold w-8 h-8 rounded-full flex items-center justify-center border border-orange-200">{totalItems}</div>
                <div className="flex flex-col items-start leading-none">
                   <span className="text-xs text-orange-200 mb-0.5">Total</span>
                   <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
                </div>
             </div>
             <div className="flex items-center gap-2 font-bold text-lg">View Cart <ShoppingCart size={20} /></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
