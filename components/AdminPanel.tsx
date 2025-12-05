
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Plus, Edit2, Image as ImageIcon, Settings, Package, LayoutGrid, MonitorPlay, Users, LogOut, Filter } from 'lucide-react';
import { Product, StoreSettings, Category, Banner, User } from '../types';
import { resizeImage } from '../utils';
import { formatCurrency } from '../utils';

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  settings: StoreSettings;
  users: User[];
  onBack: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateCategory: (category: Category) => void;
  onAddBanner: (banner: Banner) => void;
  onDeleteBanner: (id: string) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onAddUser: (user: User) => void;
  onDeleteUser: (username: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  categories,
  banners,
  settings, 
  users,
  onBack, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  onAddBanner,
  onDeleteBanner,
  onUpdateSettings,
  onAddUser,
  onDeleteUser
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'banners' | 'settings' | 'users'>('products');
  
  // Security State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Settings State
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee.toString());
  const [minFreeDelivery, setMinFreeDelivery] = useState(settings.minFreeDeliveryAmount.toString());
  const [minOrderValue, setMinOrderValue] = useState(settings.minOrderValue?.toString() || "100");
  const [storeLogo, setStoreLogo] = useState<string | undefined>(settings.logo);

  // Category State
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<string | undefined>(undefined);

  // Banner State
  const [newBannerImage, setNewBannerImage] = useState<string | undefined>(undefined);
  const [newBannerOrder, setNewBannerOrder] = useState<number>(1);

  // User Mgmt State
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<'editor' | 'superadmin'>('editor');

  // Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newEnglishName, setNewEnglishName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newMrp, setNewMrp] = useState(""); 
  const [newUnit, setNewUnit] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]?.id || "");
  const [newImage, setNewImage] = useState<string | undefined>(undefined);

  // Product Filter State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  useEffect(() => {
    let timer: any;
    if (lockoutTime) {
      timer = setInterval(() => {
        const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
        if (remaining <= 0) {
          setLockoutTime(null);
          setFailedAttempts(0);
          setError("");
          setTimeRemaining(0);
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime) return;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      setCurrentUser(user);
      setError("");
      setFailedAttempts(0);
      setUsername("");
      setPassword("");
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      setPassword("");
      
      if (attempts >= 3) {
        const lockDuration = 30 * 1000;
        const unlockTime = Date.now() + lockDuration;
        setLockoutTime(unlockTime);
        setTimeRemaining(30);
        setError("बहुत सारे गलत प्रयास। 30 सेकंड के लिए लॉक किया गया।");
      } else {
        setError(`गलत विवरण। प्रयास बाकी: ${3 - attempts}`);
      }
    }
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setActiveTab('products');
  };

  // Image Upload Handlers
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeImage(file, 300);
        setNewImage(resized);
      } catch (err) {
        alert("Image upload failed");
      }
    }
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeImage(file, 200);
        setNewCategoryImage(resized);
      } catch (err) {
        alert("Image upload failed");
      }
    }
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeImage(file, 1200);
        setNewBannerImage(resized);
      } catch (err) {
        alert("Image upload failed");
      }
    }
  };
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resized = await resizeImage(file, 200);
        setStoreLogo(resized);
      } catch (err) {
        alert("Image upload failed");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newUnit || !newStock) return;

    const price = Number(newPrice);
    const mrp = newMrp ? Number(newMrp) : undefined;
    const stock = Number(newStock);

    const productData: Product = {
      id: editingId || Date.now().toString(),
      name: newName,
      englishName: newEnglishName,
      brand: newBrand,
      price: price,
      mrp: mrp,
      unit: newUnit,
      stock: stock,
      categoryId: newCategory,
      imageSeed: newEnglishName || 'default',
      image: newImage
    };

    if (editingId) {
      onUpdateProduct(productData);
      alert("आइटम अपडेट हो गया!");
    } else {
      onAddProduct(productData);
      alert("नया आइटम जोड़ा गया!");
    }
    
    // Reset
    setEditingId(null);
    setNewName("");
    setNewEnglishName("");
    setNewBrand("");
    setNewPrice("");
    setNewMrp("");
    setNewUnit("");
    setNewStock("");
    setNewImage(undefined);
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewEnglishName(product.englishName || "");
    setNewBrand(product.brand || "");
    setNewPrice(product.price.toString());
    setNewMrp(product.mrp ? product.mrp.toString() : "");
    setNewUnit(product.unit);
    setNewStock(product.stock.toString());
    setNewCategory(product.categoryId);
    setNewImage(product.image);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newCategoryName.trim()) return;

    if (editingCategoryId) {
        onUpdateCategory({ id: editingCategoryId, name: newCategoryName, image: newCategoryImage });
    } else {
        const id = newCategoryName.toLowerCase().replace(/\s+/g, '_');
        onAddCategory({ id, name: newCategoryName, image: newCategoryImage });
    }
    setEditingCategoryId(null);
    setNewCategoryName("");
    setNewCategoryImage(undefined);
  };

  const handleEditCategoryClick = (cat: Category) => {
    setEditingCategoryId(cat.id);
    setNewCategoryName(cat.name);
    setNewCategoryImage(cat.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelCategoryEdit = () => {
    setEditingCategoryId(null);
    setNewCategoryName("");
    setNewCategoryImage(undefined);
  };

  const handleBannerSubmit = () => {
    if (!newBannerImage) return;
    onAddBanner({ id: Date.now().toString(), image: newBannerImage, order: newBannerOrder });
    setNewBannerImage(undefined);
    setNewBannerOrder(prev => prev + 1);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newUserUsername || !newUserPassword) return;
      if (users.some(u => u.username === newUserUsername)) {
          alert("Username already exists");
          return;
      }
      onAddUser({
          username: newUserUsername,
          password: newUserPassword,
          name: newUserName,
          role: newUserRole
      });
      setNewUserUsername("");
      setNewUserPassword("");
      setNewUserName("");
  };
  
  const handleSettingsSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onUpdateSettings({ 
          deliveryFee: Number(deliveryFee), 
          minFreeDeliveryAmount: Number(minFreeDelivery),
          logo: storeLogo,
          minOrderValue: Number(minOrderValue)
      }); 
      alert("Saved");
  };

  // Helper functions for filtering and display
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const filteredProducts = products.filter(p => 
      selectedCategoryFilter === 'all' ? true : p.categoryId === selectedCategoryFilter
  );

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">एडमिन लॉगिन</h2>
              <p className="text-sm text-gray-500">Discount store Sandhole</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username / Email</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    disabled={!!lockoutTime}
                    required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    disabled={!!lockoutTime}
                    required
                />
            </div>

            {error && <div className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">{error} {lockoutTime && `(${timeRemaining}s)`}</div>}
            
            <button 
              type="submit" 
              className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${lockoutTime ? 'bg-gray-400' : 'bg-gray-900 hover:bg-black'}`}
              disabled={!!lockoutTime}
            >
              लॉगिन (Login)
            </button>
            <button type="button" onClick={onBack} className="w-full text-gray-500 py-2 text-sm">वापस जाएं (Back)</button>
          </form>
        </div>
      </div>
    );
  }

  const isSuperAdmin = currentUser.role === 'superadmin';

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-1 hover:bg-gray-800 rounded"><ArrowLeft /></button>
             <div>
                 <h1 className="text-lg font-bold leading-none">एडमिन पैनल</h1>
                 <p className="text-xs text-gray-400">Hi, {currentUser.name} ({currentUser.role})</p>
             </div>
        </div>
        <button onClick={handleLogout} className="text-sm bg-gray-800 px-3 py-1.5 rounded flex items-center gap-2 hover:bg-gray-700">
            <LogOut size={14} /> Logout
        </button>
      </div>

      <div className="flex bg-white border-b border-gray-200 overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('products')} className={`flex-1 py-3 px-4 whitespace-nowrap font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
          <Package size={16} /> सामान
        </button>
        {isSuperAdmin && (
            <>
                <button onClick={() => setActiveTab('categories')} className={`flex-1 py-3 px-4 whitespace-nowrap font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <LayoutGrid size={16} /> श्रेणियाँ
                </button>
                <button onClick={() => setActiveTab('banners')} className={`flex-1 py-3 px-4 whitespace-nowrap font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'banners' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <MonitorPlay size={16} /> Banners
                </button>
                <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 px-4 whitespace-nowrap font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <Settings size={16} /> सेटिंग्स
                </button>
                <button onClick={() => setActiveTab('users')} className={`flex-1 py-3 px-4 whitespace-nowrap font-bold text-sm flex items-center justify-center gap-2 ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <Users size={16} /> Users
                </button>
            </>
        )}
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        
        {activeTab === 'products' && (
          <>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center gap-2">{editingId ? <Edit2 size={16}/> : <Plus size={16}/>} {editingId ? 'अपडेट' : 'नया सामान'}</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                            {newImage ? <img src={newImage} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                        </div>
                        <label className="text-sm bg-gray-100 px-3 py-2 rounded cursor-pointer hover:bg-gray-200">
                           फोटो बदलें <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                        </label>
                    </div>
                    <input placeholder="Name (Hindi)" value={newName} onChange={e => setNewName(e.target.value)} className="w-full p-2 border rounded" required />
                    <input placeholder="Name (English)" value={newEnglishName} onChange={e => setNewEnglishName(e.target.value)} className="w-full p-2 border rounded" />
                    <input placeholder="Brand (e.g. Tata, MDH)" value={newBrand} onChange={e => setNewBrand(e.target.value)} className="w-full p-2 border rounded" />
                    
                    <div className="grid grid-cols-2 gap-2">
                         <input placeholder="Price" type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full p-2 border rounded" required />
                         <input placeholder="MRP" type="number" value={newMrp} onChange={e => setNewMrp(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                         <input placeholder="Unit (e.g. 1 kg)" value={newUnit} onChange={e => setNewUnit(e.target.value)} className="w-full p-2 border rounded" required />
                         <input placeholder="Stock" type="number" value={newStock} onChange={e => setNewStock(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full p-2 border rounded">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && <button type="button" onClick={() => { 
                      setEditingId(null); 
                      setNewName(""); 
                      setNewEnglishName(""); 
                      setNewBrand("");
                      setNewPrice(""); 
                      setNewMrp("");
                      setNewUnit("");
                      setNewStock("");
                      setNewImage(undefined); 
                    }} className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded">Cancel</button>}
                </form>
             </div>

             {/* Category Filter */}
             <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-2">
                <Filter size={16} className="text-gray-500 flex-shrink-0" />
                <button 
                    onClick={() => setSelectedCategoryFilter('all')}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                        selectedCategoryFilter === 'all' 
                        ? 'bg-gray-800 text-white border-gray-800' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    All Items
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setSelectedCategoryFilter(cat.id)}
                        className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                            selectedCategoryFilter === cat.id 
                            ? 'bg-gray-800 text-white border-gray-800' 
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
             </div>

             {/* List */}
             <div className="space-y-2">
                {filteredProducts.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                                {p.image ? <img src={p.image} className="w-full h-full object-cover"/> : <Package className="p-2 text-gray-400 w-full h-full"/>}
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-800">{p.name}</div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                                    <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 font-medium">
                                        {getCategoryName(p.categoryId)}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {formatCurrency(p.price)} • Stock: {p.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 pl-2">
                            <button onClick={() => handleEditClick(p)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 size={18} /></button>
                            {isSuperAdmin && (
                                <button onClick={() => { if(window.confirm('Delete?')) onDeleteProduct(p.id); }} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"><Trash2 size={18} /></button>
                            )}
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm">
                        No products found in this category.
                    </div>
                )}
             </div>
          </>
        )}

        {isSuperAdmin && activeTab === 'categories' && (
             <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  {editingCategoryId ? <Edit2 size={16}/> : <Plus size={16}/>} 
                  {editingCategoryId ? 'श्रेणी अपडेट करें (Update Category)' : 'नई श्रेणी (Add Category)'}
                </h3>
                <form onSubmit={handleCategorySubmit} className="space-y-3 mb-6">
                    <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                            {newCategoryImage ? <img src={newCategoryImage} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                        </div>
                        <label className="text-sm bg-gray-100 px-3 py-2 rounded cursor-pointer hover:bg-gray-200">
                           फोटो बदलें <input type="file" accept="image/*" onChange={handleCategoryImageUpload} className="hidden" />
                        </label>
                    </div>
                    <input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="Category Name" className="w-full p-2 border rounded" required />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">
                            {editingCategoryId ? 'Update Category' : 'Add Category'}
                        </button>
                        {editingCategoryId && (
                            <button type="button" onClick={handleCancelCategoryEdit} className="px-4 bg-gray-200 text-gray-700 font-bold py-2 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <div key={cat.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white rounded overflow-hidden border">
                                     {cat.image ? <img src={cat.image} className="w-full h-full object-cover"/> : <Package className="p-2 text-gray-400"/>}
                                 </div>
                                 <span className="font-medium">{cat.name}</span>
                             </div>
                             <div className="flex gap-2">
                                 <button onClick={() => handleEditCategoryClick(cat)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition-colors"><Edit2 size={18} /></button>
                                 <button onClick={() => onDeleteCategory(cat.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"><Trash2 size={18}/></button>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {isSuperAdmin && activeTab === 'banners' && (
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4">Offer Banners</h3>
                <div className="mb-6 space-y-3">
                     <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                         {newBannerImage ? (
                            <img src={newBannerImage} className="w-full h-full object-cover" />
                         ) : (
                            <div className="text-center text-gray-400">
                                <ImageIcon className="mx-auto mb-2" />
                                <span className="text-xs">Click to upload banner (800x400)</span>
                            </div>
                         )}
                         <input type="file" accept="image/*" onChange={handleBannerImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                     <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Order/Rank:</label>
                        <input 
                            type="number" 
                            value={newBannerOrder} 
                            onChange={(e) => setNewBannerOrder(Number(e.target.value))} 
                            className="w-20 p-2 border rounded text-center"
                            min="1"
                        />
                     </div>
                     <button onClick={handleBannerSubmit} disabled={!newBannerImage} className="w-full bg-blue-600 text-white font-bold py-2 rounded disabled:bg-gray-300">
                        Add Banner
                     </button>
                </div>
                
                <div className="space-y-4">
                    {banners.sort((a,b) => (a.order || 0) - (b.order || 0)).map(banner => (
                        <div key={banner.id} className="relative rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={banner.image} alt="Banner" className="w-full h-32 object-cover" />
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                Order: {banner.order}
                            </div>
                            <button 
                                onClick={() => onDeleteBanner(banner.id)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md opacity-90 hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        {isSuperAdmin && activeTab === 'settings' && (
             <form onSubmit={handleSettingsSubmit}>
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-4">
                     <h3 className="font-bold text-gray-800">General Settings</h3>
                     
                     {/* Logo Upload */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full border flex items-center justify-center overflow-hidden">
                                {storeLogo ? <img src={storeLogo} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                            </div>
                            <label className="text-sm bg-gray-100 px-3 py-2 rounded cursor-pointer hover:bg-gray-200">
                                Upload Logo <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                            </label>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee (₹)</label>
                            <input type="number" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)} className="w-full p-2 border rounded" placeholder="Delivery Fee" />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Free Delivery (₹)</label>
                            <input type="number" value={minFreeDelivery} onChange={e => setMinFreeDelivery(e.target.value)} className="w-full p-2 border rounded" placeholder="Min Free Delivery" />
                         </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Value (₹)</label>
                        <input type="number" value={minOrderValue} onChange={e => setMinOrderValue(e.target.value)} className="w-full p-2 border rounded" placeholder="Min Order Value" />
                     </div>
                     <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Settings</button>
                 </div>
             </form>
        )}

        {isSuperAdmin && activeTab === 'users' && (
             <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Users size={20} /> User Management
                </h3>
                
                <form onSubmit={handleAddUserSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6 space-y-3">
                    <h4 className="font-bold text-sm text-gray-700">Add New User</h4>
                    <input 
                        type="text" 
                        placeholder="Name (e.g. John)" 
                        value={newUserName} 
                        onChange={(e) => setNewUserName(e.target.value)} 
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Username / Email" 
                        value={newUserUsername} 
                        onChange={(e) => setNewUserUsername(e.target.value)} 
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={newUserPassword} 
                        onChange={(e) => setNewUserPassword(e.target.value)} 
                        className="w-full p-2 border rounded"
                        required
                    />
                    <select 
                        value={newUserRole} 
                        onChange={(e) => setNewUserRole(e.target.value as any)} 
                        className="w-full p-2 border rounded"
                    >
                        <option value="editor">Editor (Products only)</option>
                        <option value="superadmin">Superadmin (Full Access)</option>
                    </select>
                    <button className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">
                        Add User
                    </button>
                </form>

                <div className="space-y-3">
                    <h4 className="font-bold text-sm text-gray-700">Existing Users</h4>
                    {users.map(u => (
                        <div key={u.username} className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${u.role === 'superadmin' ? 'bg-purple-600' : 'bg-blue-500'}`}>
                                    {u.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{u.name}</div>
                                    <div className="text-xs text-gray-500">{u.username} • <span className="uppercase">{u.role}</span></div>
                                </div>
                            </div>
                            {u.username !== currentUser.username && (
                                <button onClick={() => { if(window.confirm("Remove user?")) onDeleteUser(u.username); }} className="text-red-500 p-2 hover:bg-red-50 rounded">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
             </div>
        )}

      </div>
    </div>
  );
};
