import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, Droplets, Cpu, Wind, Hammer, Car, Paintbrush, Grid, Scissors, Sparkles, Shield, Smartphone } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const ICON_MAP = {
  Zap, Droplets, Cpu, Wind, Hammer, Car, Paintbrush, Grid, Scissors, Sparkles, Shield, Smartphone
};

export default function TopCategoriesSection({ onSelectCategory }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Trade & Service Categories
            </h2>
            <p className="text-slate-600 text-sm mt-1 font-normal">
              Find specialized artisans by trade in Akure
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel / Cards List */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {CATEGORIES.filter(c => c.id !== 'all').map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Zap;
            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="w-60 shrink-0 bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-[#0F766E] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-40"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {category.count} Artisans in Akure
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
