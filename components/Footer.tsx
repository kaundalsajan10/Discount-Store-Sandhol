
import React from 'react';
import { Phone, MessageCircle, MapPin, Truck } from 'lucide-react';
import { STORE_NAME, STORE_CALL_NUMBER, STORE_PHONE_NUMBER } from '../constants';
import { StoreSettings } from '../types';
import { formatCurrency } from '../utils';

interface FooterProps {
  settings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 pb-32 pt-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{STORE_NAME}</h3>
            <p className="text-sm text-gray-500 max-w-xs">
                आपके घर तक ताज़ा राशन और रोजमर्रा की ज़रूरतें।
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Info */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <Phone size={18} className="text-orange-600"/> संपर्क विवरण (Contact)
                </h4>
                <div className="space-y-3 text-sm">
                    <a href={`tel:+${STORE_CALL_NUMBER}`} className="flex items-center justify-center gap-2 text-gray-700 hover:text-orange-700 p-2 bg-white rounded-lg shadow-sm transition-colors">
                        <span>कॉल करें:</span>
                        <span className="font-mono font-bold">+{STORE_CALL_NUMBER}</span>
                    </a>
                    <a href={`https://wa.me/${STORE_PHONE_NUMBER}`} className="flex items-center justify-center gap-2 text-gray-700 hover:text-green-700 p-2 bg-white rounded-lg shadow-sm transition-colors">
                        <MessageCircle size={16} className="text-green-600" />
                        <span>WhatsApp:</span>
                        <span className="font-mono font-bold">+{STORE_PHONE_NUMBER}</span>
                    </a>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                    <Truck size={18} className="text-blue-600"/> डिलीवरी जानकारी
                </h4>
                <div className="space-y-2 text-sm text-center text-gray-700">
                    <p className="flex justify-between border-b border-blue-200 pb-2">
                        <span>न्यूनतम ऑर्डर (Min Order):</span>
                        <span className="font-bold">₹0</span>
                    </p>
                    <p className="flex justify-between border-b border-blue-200 pb-2">
                        <span>डिलीवरी शुल्क (Delivery Fee):</span>
                        <span className="font-bold">{formatCurrency(settings.deliveryFee)}</span>
                    </p>
                    <p className="flex justify-between pt-1">
                        <span>मुफ़्त डिलीवरी (Free Delivery):</span>
                        <span className="font-bold text-green-600">{formatCurrency(settings.minFreeDeliveryAmount)} से ऊपर</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
            <p className="flex items-center justify-center gap-1 mb-1">
                <MapPin size={12} /> Sandhole, Himachal Pradesh
            </p>
            © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
