
import React, { useState, useEffect } from 'react';
import { Banner } from '../types';

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sort banners by order
  const sortedBanners = React.useMemo(() => {
    return [...banners].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [banners]);

  useEffect(() => {
    if (sortedBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sortedBanners.length]);

  if (sortedBanners.length === 0) return null;

  return (
    <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] rounded-xl overflow-hidden shadow-sm bg-gray-100 my-4">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sortedBanners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img 
              src={banner.image} 
              alt="Offer" 
              className="w-full h-full object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      {sortedBanners.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
            {sortedBanners.map((_, idx) => (
                <div 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                />
            ))}
        </div>
      )}
    </div>
  );
};
