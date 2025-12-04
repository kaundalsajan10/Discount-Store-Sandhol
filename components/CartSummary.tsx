
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem, CustomerDetails, StoreSettings } from '../types';
import { formatCurrency, generateWhatsAppLink } from '../utils';
import { ConfirmationModal } from './ConfirmationModal';

interface CartSummaryProps {
  items: CartItem[];
  settings: StoreSettings;
  onBack: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, qty: number) => void;
  onSuccess: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, settings, onBack, onUpdateQuantity, onSetQuantity, onSuccess }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Delivery Fee Logic
  const isFreeDelivery = totalAmount >= settings.minFreeDeliveryAmount;
  const deliveryFee = isFreeDelivery ? 0 : settings.deliveryFee;
  const grandTotal = totalAmount + deliveryFee;

  const handleCheckout = (customer: CustomerDetails) => {
    const link = generateWhatsAppLink(items, totalAmount, deliveryFee, customer);
    window.open(link, '_blank');
    setShowConfirm(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ConfirmationModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCheckout}
        totalAmount={totalAmount}
        totalItems={totalItems}
        deliveryFee={deliveryFee}
      />

      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-20">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 rounded-full active:bg-gray-100 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">आपकी टोकरी ({totalItems})</h2>
      </div>

      {/* List */}
      <div className="flex-1 p-4 pb-32">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 shadow-sm border border-orange-100">
                <ShoppingBag size={40} className="text-orange-400 opacity-90" />
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">आपकी टोकरी खाली है</p>
            <p className="text-gray-400 mb-8 text-center px-8 text-sm">
                ताज़ा किराने का सामान बस एक क्लिक दूर है।
            </p>
            <button 
                onClick={onBack} 
                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-orange-700 transition-transform active:scale-95"
            >
              अभी खरीदारी करें (Shop Now)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {items.map((item, idx) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.englishName}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium bg-gray-100 px-1.5 rounded text-xs mr-2">{item.brand || 'Generic'}</span>
                        {item.unit}
                      </div>
                      <div className="text-sm font-bold text-orange-700 mt-1">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                    
                    <div className="flex items-center bg-gray-100 rounded-lg self-end sm:self-auto border border-gray-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 active:bg-gray-200 hover:bg-gray-200 rounded-l-lg"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            onSetQuantity(item.id, val);
                          }
                        }}
                        className="w-12 h-10 text-center font-medium text-gray-800 bg-gray-50 border-x border-gray-200 focus:outline-none focus:bg-white"
                      />
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 active:bg-gray-200 hover:bg-gray-200 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
             </div>

             {/* Bill Details */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-bold text-gray-800 mb-3">बिल का विवरण</h3>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>कुल आइटम</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>सामान का कुल मूल्य</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>डिलीवरी शुल्क</span>
                  {isFreeDelivery ? (
                    <span className="text-green-600">मुफ़्त</span>
                  ) : (
                    <span className="text-orange-700">+{formatCurrency(deliveryFee)}</span>
                  )}
                </div>
                {!isFreeDelivery && (
                  <div className="text-xs text-blue-600 mb-2 bg-blue-50 p-2 rounded">
                    {formatCurrency(settings.minFreeDeliveryAmount - totalAmount)} और जोड़ें मुफ़्त डिलीवरी के लिए!
                  </div>
                )}
                
                <div className="border-t border-dashed border-gray-300 my-2 pt-2 flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">कुल देय राशि</span>
                  <span className="font-bold text-lg text-orange-700">{formatCurrency(grandTotal)}</span>
                </div>
             </div>

             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium">
                  ℹ️ भुगतान केवल डिलीवरी पर नकद (COD) या UPI द्वारा स्वीकार किया जाता है।
                </p>
             </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
           <div className="max-w-3xl mx-auto">
              <button 
                onClick={() => setShowConfirm(true)}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] active:bg-[#075E54] text-white text-lg font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={24} className="text-white fill-current" />
                <span>WhatsApp पर ऑर्डर करें</span>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
