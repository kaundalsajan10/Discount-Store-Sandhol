
import { CartItem, CustomerDetails } from './types';
import { STORE_NAME, STORE_PHONE_NUMBER } from './constants';

export const formatCurrency = (amount: number): string => {
  return `₹${amount}`;
};

export const resizeImage = (file: File, maxWidth: number = 500): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG 0.7 quality to save space
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateWhatsAppLink = (
  items: CartItem[], 
  subTotal: number, 
  deliveryFee: number,
  customer: CustomerDetails
): string => {
  const lineItems = items
    .map((item) => `• ${item.name} (${item.brand || 'Std'}) - ${item.unit} x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const grandTotal = subTotal + deliveryFee;

  const message = `*${STORE_NAME}* पर नया ऑर्डर:

*ग्राहक विवरण (Customer Details):*
नाम: ${customer.name}
पता: ${customer.address}
फोन: ${customer.phone}

*ऑर्डर सूची (Order List):*
-----------------------------
${lineItems}
-----------------------------
आइटम कुल: ${formatCurrency(subTotal)}
${deliveryFee > 0 ? `डिलीवरी चार्ज: ${formatCurrency(deliveryFee)}` : `डिलीवरी: मुफ़्त`}
*कुल देय राशि: ${formatCurrency(grandTotal)}*

भुगतान: केवल डिलीवरी पर नकद (COD) या UPI द्वारा।
कृपया मेरा ऑर्डर कन्फर्म करें।`;

  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};
