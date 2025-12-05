
import React from 'react';
import { Flame } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface TopDealsCarouselProps {
  products: Product[];
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TopDealsCarousel: React.FC<TopDealsCarouselProps> = ({ products, cart, onAdd, onRemove }) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-6 overflow-hidden">
      <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2 px-4">
         <Flame className="text-orange-600" />
         धमाकेदार ऑफर (Top Deals)
      </h3>
      {/* Container to hide overflow */}
      <div className="relative w-full overflow-hidden">
          {/* Moving track - duplicated content for seamless loop */}
          <div className="flex w-max animate-marquee">
              {/* Set 1 */}
              <div className="flex gap-3 pr-3">
                  {products.map(product => (
                     <div key={`orig-${product.id}`} className="w-[85vw] sm:w-[300px] flex-shrink-0">
                        <ProductCard
                            product={product}
                            quantity={cart[product.id] || 0}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                     </div>
                  ))}
              </div>
              {/* Set 2 (Duplicate) */}
              <div className="flex gap-3 pr-3">
                  {products.map(product => (
                     <div key={`dup-${product.id}`} className="w-[85vw] sm:w-[300px] flex-shrink-0">
                        <ProductCard
                            product={product}
                            quantity={cart[product.id] || 0}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                     </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
