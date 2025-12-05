
import React from 'react';
import { Phone, MapPin, Truck, Store } from 'lucide-react';
import { STORE_NAME, STORE_CALL_NUMBER, STORE_PHONE_NUMBER } from '../constants';
import { StoreSettings } from '../types';
import { formatCurrency } from '../utils';

interface FooterProps {
  settings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-orange-600 text-white mt-auto pt-8 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-3xl mx-auto px-5">
        
        <div className="grid grid-cols-2 gap-8 mb-6">
            {/* Left: Contact */}
            <div>
                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
                    <Phone size={14} className="text-orange-100"/> संपर्क (Contact)
                </h4>
                <ul className="space-y-2.5 text-xs text-orange-100">
                    <li>
                        <a href={`tel:+${STORE_CALL_NUMBER}`} className="flex items-center gap-2 hover:text-white transition-colors">
                             <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span> 
                             Call: <span className="font-medium">+{STORE_CALL_NUMBER}</span>
                        </a>
                    </li>
                    <li>
                        <a href={`https://wa.me/${STORE_PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-white transition-colors">
                             <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> 
                             WhatsApp: <span className="font-medium">+{STORE_PHONE_NUMBER}</span>
                        </a>
                    </li>
                    <li className="flex items-center gap-2 text-orange-200">
                        <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span> 
                        <span className="flex items-center gap-1"><MapPin size={10} /> Sandhole, HP</span>
                    </li>
                </ul>
            </div>

            {/* Right: Delivery */}
            <div>
                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
                    <Truck size={14} className="text-orange-100"/> डिलीवरी (Delivery)
                </h4>
                <ul className="space-y-2.5 text-xs text-orange-100">
                     <li className="flex justify-between items-center max-w-[160px] border-b border-dashed border-orange-400 pb-1">
                        <span>Charge:</span> <span className="font-medium">{formatCurrency(settings.deliveryFee)}</span>
                     </li>
                     <li className="flex justify-between items-center max-w-[160px] border-b border-dashed border-orange-400 pb-1">
                        <span>Free above:</span> <span className="font-bold text-white">{formatCurrency(settings.minFreeDeliveryAmount)}</span>
                     </li>
                     <li className="text-[10px] text-orange-200 mt-1 italic opacity-80">
                        *COD & UPI Payment accepted
                     </li>
                </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
             <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                <Store size={14} className="text-orange-200" />
                {STORE_NAME}
             </div>
             <p className="text-[10px] text-orange-200 opacity-80">
                © {new Date().getFullYear()} All rights reserved.
             </p>
        </div>
      </div>
    </footer>
  );
};
