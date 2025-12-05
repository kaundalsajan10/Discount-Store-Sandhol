
import React, { useState } from 'react';
import { Plus, Minus, Package, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onAdd, onRemove }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isMaxStockReached = quantity >= product.stock;
  const isLowStock = !isOutOfStock && product.stock < 5;

  // Calculate discount
  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount && product.mrp 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const handleAdd = () => {
    if (isMaxStockReached) return;
    onAdd(product.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <div className={`group flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-3 mb-3 items-start relative ${isOutOfStock ? 'opacity-70' : ''}`}>
      {/* Brand Badge */}
      {product.brand && (
        <div className="absolute top-0 right-0 bg-orange-50 text-orange-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg border-b border-l border-orange-100 z-10">
          {product.brand}
        </div>
      )}

      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative mt-1 flex items-center justify-center border border-gray-200">
        {product.image ? (
            <img 
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
            loading="lazy"
            />
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full bg-gray-50">
                <Package size={24} className="mb-1 opacity-50" />
                <span className="text-[10px] font-bold uppercase opacity-50 px-1 text-center leading-none">
                    {product.name.charAt(0)}
                </span>
            </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 ml-3 flex flex-col min-h-[6rem]">
        <div>
          <h3 className="text-lg font-bold text-gray-800 leading-tight">
            {product.name}
          </h3>
          {product.englishName && (
             <p className="text-sm text-gray-500 font-medium">{product.englishName}</p>
          )}
          {isLowStock && (
             <p className="text-[10px] text-red-600 font-bold flex items-center gap-1 mt-0.5 animate-pulse">
                <AlertCircle size={10} />
                केवल {product.stock} बचे हैं!
             </p>
          )}
        </div>
        
        <div className="mt-auto pt-2 flex justify-between items-end">
          <div>
            <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded text-center mb-1">
              {product.unit}
            </div>
            <div className="flex flex-col">
              {hasDiscount && (
                <div className="flex items-center gap-1.5 leading-none mb-0.5">
                   <span className="text-xs text-gray-400 line-through decoration-gray-400">
                     {formatCurrency(product.mrp!)}
                   </span>
                   <span className="text-[10px] font-bold text-white bg-green-600 px-1.5 py-0.5 rounded-sm">
                     {discountPercent}% OFF
                   </span>
                </div>
              )}
              <div className="text-orange-700 font-bold text-lg leading-none">{formatCurrency(product.price)}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center">
            {isOutOfStock ? (
               <span className="text-red-600 text-sm font-bold bg-red-50 px-2 py-1 rounded border border-red-100">
                 स्टॉक ख़त्म
               </span>
            ) : quantity === 0 ? (
              <button
                onClick={handleAdd}
                className={`bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm border border-orange-200 hover:bg-orange-200 transition-all opacity-0 group-hover:opacity-100 ${isAnimating ? 'scale-95 bg-orange-300' : 'active:scale-95'}`}
              >
                जोड़ें (Add)
              </button>
            ) : (
              <div className="flex items-center bg-orange-50 rounded-lg border border-orange-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => onRemove(product.id)}
                  className="w-8 h-8 flex items-center justify-center text-orange-700 hover:bg-orange-100 active:bg-orange-200"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-orange-900 text-sm">{quantity}</span>
                <button 
                  onClick={handleAdd}
                  className={`w-8 h-8 flex items-center justify-center text-orange-700 transition-all ${isMaxStockReached ? 'opacity-40 cursor-not-allowed' : 'hover:bg-orange-100'} ${isAnimating ? 'bg-orange-200 scale-90' : 'active:bg-orange-200'}`}
                  disabled={isMaxStockReached}
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
