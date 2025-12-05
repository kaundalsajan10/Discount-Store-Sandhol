
import React from 'react';
import { LayoutGrid, Package } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (id: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <LayoutGrid size={18} className="text-orange-600" />
        श्रेणियाँ (Categories)
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="group flex flex-col items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200"
          >
            <div className="w-12 h-12 mb-2 rounded-full bg-orange-50 flex items-center justify-center overflow-hidden border border-orange-100 transition-transform duration-300 group-hover:scale-110 group-hover:border-orange-200 shadow-inner">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <Package className="text-orange-300 transition-colors group-hover:text-orange-500" size={24} />
              )}
            </div>
            <span className="text-xs font-bold text-center text-gray-800 line-clamp-2 leading-tight transition-colors group-hover:text-orange-700">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
