import React, { useState } from 'react';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import { SEARCH_PLACEHOLDERS, AKURE_DISTRICTS } from '../data/services';

export default function HeroSearch({ onSearch, selectedDistrict, setSelectedDistrict }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-5 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-2 pl-4 sm:pl-5 flex flex-col sm:flex-row items-center justify-between border border-slate-200 shadow-sm gap-2 text-slate-900"
      >
        
        {/* Left: Input */}
        <div className="flex items-center gap-2.5 flex-1 w-full text-left">
          <Search className="w-5 h-5 shrink-0 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Electrician, Plumber, AC Repair..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none font-medium"
          />
        </div>

        {/* Middle: Akure District Selector */}
        <div className="relative shrink-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#0F766E] shrink-0" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-transparent text-slate-800 font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer pr-2"
          >
            {AKURE_DISTRICTS.map((dist, idx) => (
              <option key={idx} value={idx === 0 ? 'all' : dist} className="text-slate-900 font-normal">
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Right CTA Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
        >
          <span>Search</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>

      </form>
    </div>
  );
}
