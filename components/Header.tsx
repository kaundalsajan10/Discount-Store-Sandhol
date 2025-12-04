
import React from 'react';
import { ShoppingBag, Phone, Lock } from 'lucide-react';
import { STORE_NAME, STORE_CALL_NUMBER } from '../constants';

interface HeaderProps {
  onAdminClick?: () => void;
  onHomeClick: () => void;
  logo?: string;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick, onHomeClick, logo }) => {
  return (
    <header className="sticky top-0 z-50 bg-orange-600 text-white shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={onHomeClick} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          {logo ? (
            <div className="bg-white p-1 rounded-full text-orange-600 shadow-sm w-12 h-12 flex items-center justify-center overflow-hidden">
               <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          ) : (
            <div className="bg-white p-2 rounded-full text-orange-600 shadow-sm">
               <ShoppingBag size={20} />
            </div>
          )}
          <div className="text-left">
            <h1 className="text-lg font-bold leading-none">{STORE_NAME}</h1>
            <p className="text-[10px] text-orange-100 mt-0.5 opacity-90">MRP की ऐसी की तैसी (MRP Ki Aisi Ki Taisi)</p>
          </div>
        </button>
        
        <div className="flex items-center gap-2">
          <a 
            href={`tel:+${STORE_CALL_NUMBER}`}
            className="flex items-center gap-1 bg-white text-orange-700 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm active:bg-gray-50 transition-colors hover:bg-gray-50"
          >
            <Phone size={14} className="fill-current" />
            <span>कॉल</span>
          </a>
          {onAdminClick && (
             <button 
              onClick={onAdminClick}
              className="p-2 text-orange-200 hover:text-white transition-colors"
            >
              <Lock size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
