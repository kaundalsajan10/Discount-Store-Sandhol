
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../utils';
import { CustomerDetails } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: CustomerDetails) => void;
  totalAmount: number;
  totalItems: number;
  deliveryFee: number;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  totalItems,
  deliveryFee
}) => {
  const [step, setStep] = useState<'DETAILS' | 'VERIFICATION'>('DETAILS');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  
  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('DETAILS');
      setErrors({});
      setCaptchaInput('');
    }
  }, [isOpen]);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded I, 1, O, 0
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    drawCaptcha(code);
    setCaptchaInput('');
    setErrors(prev => ({ ...prev, captcha: '' }));
  };

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and set background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise (lines)
    for (let i = 0; i < 7; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Add noise (dots)
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw text
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw each character with slight rotation and offset
    const startX = 30;
    const spacing = 25;
    
    for (let i = 0; i < code.length; i++) {
        ctx.save();
        const x = startX + (i * spacing);
        const y = canvas.height / 2 + (Math.random() * 10 - 5);
        const angle = (Math.random() * 0.4) - 0.2; // -0.2 to 0.2 radians
        
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = '#374151'; // Dark gray
        ctx.fillText(code[i], 0, 0);
        ctx.restore();
    }
  };

  // Generate captcha when entering verification step
  useEffect(() => {
    if (step === 'VERIFICATION') {
        // Small timeout to ensure canvas is rendered in DOM
        setTimeout(generateCaptcha, 100);
    }
  }, [step]);

  const handleProceedToVerification = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'कृपया नाम लिखें (Name required)';
    if (!address.trim()) newErrors.address = 'कृपया पता लिखें (Address required)';
    
    // Strict Indian Phone Validation: 10 digits, starts with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
        newErrors.phone = 'कृपया फोन नंबर लिखें (Phone required)';
    } else if (!phoneRegex.test(phone.trim())) {
        newErrors.phone = 'कृपया सही 10 अंकों का मोबाइल नंबर लिखें (Invalid Number)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep('VERIFICATION');
    setErrors({});
  };

  const handleVerifyAndOrder = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
        onConfirm({ name, address, phone });
    } else {
        setErrors({ captcha: 'Re-enter the code (गलत कोड)' });
        setCaptchaInput('');
        generateCaptcha(); // Refresh on error
    }
  };

  const grandTotal = totalAmount + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-orange-50">
          <div className="flex justify-between items-start">
             <div>
                 <h3 className="text-xl font-bold text-gray-900">
                    {step === 'DETAILS' ? 'ऑर्डर पूरा करें' : 'सुरक्षा जाँच (Security Check)'}
                 </h3>
                 <p className="text-sm text-gray-600 mt-1">
                    {step === 'DETAILS' ? 'कृपया विवरण भरें' : 'कृपया नीचे दिया गया कोड लिखें'}
                 </p>
             </div>
             {step === 'VERIFICATION' && <ShieldCheck className="text-green-600" size={24} />}
          </div>
          
          {step === 'DETAILS' && (
             <div className="mt-3 bg-white bg-opacity-60 p-2 rounded-lg border border-orange-100">
                <p className="text-xs text-gray-600">कुल आइटम: {totalItems}</p>
                <p className="text-lg font-bold text-orange-800">
                   देय राशि: {formatCurrency(grandTotal)}
                </p>
             </div>
          )}
        </div>
        
        <div className="p-5 overflow-y-auto">
          {step === 'DETAILS' ? (
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">आपका नाम (Name)</label>
                 <input 
                   type="text" 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                   placeholder="Ex. Rahul Kumar"
                 />
                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">पता (Address)</label>
                 <textarea 
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                   placeholder="Ex. Village Sandhole, Near School..."
                   rows={2}
                 />
                 {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">फोन नंबर (Phone)</label>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                   <input 
                     type="tel" 
                     value={phone}
                     onChange={(e) => {
                         const val = e.target.value.replace(/\D/g, '');
                         if (val.length <= 10) setPhone(val);
                     }}
                     className={`w-full pl-12 p-3 border rounded-lg focus:ring-2 focus:ring-orange-200 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                     placeholder="9876543210"
                   />
                 </div>
                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
               </div>
             </div>
          ) : (
             <div className="space-y-6 py-4 flex flex-col items-center">
                 <div className="relative bg-gray-50 p-2 rounded-lg border border-gray-200">
                     <canvas 
                        ref={canvasRef} 
                        width="200" 
                        height="60" 
                        className="rounded cursor-pointer"
                        onClick={generateCaptcha}
                        title="Click to refresh image"
                     />
                     <button 
                        onClick={generateCaptcha}
                        className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-orange-600"
                        title="Refresh Code"
                     >
                        <RefreshCw size={20} />
                     </button>
                 </div>
                 
                 <div className="w-full max-w-[200px]">
                     <input 
                       type="text" 
                       value={captchaInput}
                       onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                       className={`w-full text-center text-xl font-bold p-2 border-2 rounded-lg focus:outline-none uppercase tracking-widest transition-colors ${
                         errors.captcha ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'
                       }`}
                       placeholder="ENTER CODE"
                       maxLength={6}
                       autoFocus
                     />
                     
                     {errors.captcha && (
                         <p className="text-red-500 text-sm mt-2 text-center font-medium animate-pulse">
                             {errors.captcha}
                         </p>
                     )}
                 </div>
                 
                 <p className="text-xs text-gray-500 text-center">
                    आर्डर कन्फर्म करने के लिए ऊपर दिया गया कोड लिखें।
                 </p>
             </div>
          )}
        </div>

        <div className="p-5 pt-0 mt-auto">
          {step === 'DETAILS' ? (
              <button
                onClick={handleProceedToVerification}
                className="w-full bg-gray-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors hover:bg-black"
              >
                आगे बढ़ें (Proceed)
              </button>
          ) : (
              <div className="flex gap-3">
                  <button
                    onClick={() => setStep('DETAILS')}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} /> पीछे
                  </button>
                  <button
                    onClick={handleVerifyAndOrder}
                    className="flex-[2] bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl shadow-md transition-colors"
                  >
                    Verify & Order
                  </button>
              </div>
          )}
          
          {step === 'DETAILS' && (
              <button
                onClick={onClose}
                className="w-full mt-3 text-gray-500 font-medium py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                रद्द करें (Cancel)
              </button>
          )}
        </div>
      </div>
    </div>
  );
};
