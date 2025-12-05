
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, ShoppingBag, ShoppingCart } from 'lucide-react';
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

  // Checkout Validation Logic
  const currentHour = new Date().getHours();
  const isShopOpen = currentHour >= 7 && currentHour < 19; // 7 AM to 7 PM
  const minItemsMet = items.length >= 2;
  const minValueMet = totalAmount >= (settings.minOrderValue || 0);

  const checkoutDisabled = !isShopOpen || !minItemsMet || !minValueMet;

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
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-20 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 rounded-full active:bg-gray-100 text-gray-600 hover:bg-gray-50">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">आपकी टोकरी ({totalItems})</h2>
      </div>

      {/* List */}
      <div className="flex-1 p-4 pb-48">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
            <div className="bg-orange-50 p-6 rounded-full mb-6 relative">
                <ShoppingBag size={48} className="text-orange-400" />
                <div className="absolute top-0 right-0 bg-orange-200 rounded-full p-1.5 animate-bounce">
                    <span className="block w-2 h-2 bg-orange-600 rounded-full"></span>
                </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">आपकी टोकरी खाली है 😔</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                लगता है आपने अभी तक कुछ नहीं चुना। <br/>
                <span className="text-orange-600 font-medium">ताज़ा और बेहतरीन</span> किराने का सामान बस एक क्लिक दूर है!
            </p>
            <button 
                onClick={onBack} 
                className="group bg-orange-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-orange-700 hover:shadow-orange-200/50 transition-all active:scale-95 flex items-center gap-2"
            >
              <ShoppingCart size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>अभी खरीदारी करें (Shop Now)</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {items.map((item, idx) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 text-lg">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.englishName}</div>
                      <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">{item.brand || 'Generic'}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{item.unit}</span>
                      </div>
                      <div className="text-base font-bold text-orange-700 mt-1">{formatCurrency(item.price * item.quantity)}</div>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 rounded-lg self-end sm:self-auto border border-gray-200 shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 active:bg-gray-200 hover:bg-gray-100 rounded-l-lg transition-colors"
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
                        className="w-12 h-10 text-center font-bold text-gray-800 bg-white border-x border-gray-200 focus:outline-none"
                      />
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 active:bg-gray-200 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
             </div>

             {/* Bill Details */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">बिल का विवरण (Bill Details)</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>कुल आइटम</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>सामान का कुल मूल्य</span>
                      <span className="font-medium">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>डिलीवरी शुल्क</span>
                      {isFreeDelivery ? (
                        <span className="text-green-600 font-bold flex items-center gap-1">
                            मुफ़्त <span className="text-xs bg-green-100 text-green-700 px-1 rounded">FREE</span>
                        </span>
                      ) : (
                        <span className="text-orange-700 font-medium">+{formatCurrency(deliveryFee)}</span>
                      )}
                    </div>
                </div>
                
                {!isFreeDelivery && (
                  <div className="mt-4 text-xs text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                    <div className="mt-0.5">💡</div>
                    <div>
                        {formatCurrency(settings.minFreeDeliveryAmount - totalAmount)} और जोड़ें और पाएं <strong>मुफ़्त डिलीवरी</strong>!
                    </div>
                  </div>
                )}
                
                <div className="border-t border-dashed border-gray-300 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">कुल देय राशि</span>
                  <span className="font-bold text-xl text-orange-700">{formatCurrency(grandTotal)}</span>
                </div>
             </div>

             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium flex gap-2">
                  <span>ℹ️</span>
                  भुगतान केवल डिलीवरी पर नकद (COD) या UPI द्वारा स्वीकार किया जाता है।
                </p>
             </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
           <div className="max-w-3xl mx-auto space-y-2">
              {/* Error Messages */}
              {!isShopOpen && (
                 <div className="text-red-600 text-xs font-bold text-center bg-red-50 p-2 rounded border border-red-100">
                    दुकान बंद है! कृपया सुबह 7 बजे से शाम 7 बजे के बीच ऑर्डर करें।
                 </div>
              )}
              {isShopOpen && !minItemsMet && (
                 <div className="text-orange-600 text-xs font-bold text-center bg-orange-50 p-2 rounded border border-orange-100">
                    कम से कम 2 अलग-अलग आइटम जोड़ें (Add at least 2 different items).
                 </div>
              )}
              {isShopOpen && minItemsMet && !minValueMet && (
                 <div className="text-orange-600 text-xs font-bold text-center bg-orange-50 p-2 rounded border border-orange-100">
                    न्यूनतम ऑर्डर राशि {formatCurrency(settings.minOrderValue || 0)} होनी चाहिए।
                 </div>
              )}

              <button 
                onClick={() => setShowConfirm(true)}
                disabled={checkoutDisabled}
                className={`w-full text-white text-lg font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${checkoutDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#128C7E] active:bg-[#075E54]'}`}
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
