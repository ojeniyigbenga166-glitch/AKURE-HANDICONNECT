import React from 'react';
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import HeroSearch from './HeroSearch';
import SuggestionChip from './SuggestionChip';
import { SUGGESTION_CHIPS } from '../data/services';

export default function Hero({
  onSearch,
  onOpenPostJob,
  onSelectCategory,
  selectedCategory,
  selectedDistrict,
  setSelectedDistrict
}) {
  return (
    <section className="bg-slate-900 text-white pt-12 pb-16 px-4 sm:px-8 lg:px-16 border-b border-slate-800 relative w-full">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Akure Location Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Serving Akure & nearby areas (Alagbaka, Ijapo, FUTA, Oba-Ile, Oda Road)</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Find trusted local artisans & <span className="text-[#0F766E] font-black">skilled pros</span> in Akure
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-6">
          Compare verified plumbers, electricians, generator mechanics, and handymen near you.
        </p>

        {/* Search Component */}
        <HeroSearch
          onSearch={onSearch}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* Suggestion Chips */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 max-w-4xl mx-auto mb-8">
          {SUGGESTION_CHIPS.map((chip) => (
            <SuggestionChip
              key={chip.id}
              chip={chip}
              isSelected={selectedCategory === chip.category}
              isDarkTheme={true}
              onClick={(cat) => onSelectCategory(cat)}
            />
          ))}
          <SuggestionChip
            chip={{ isMore: true }}
            isSelected={selectedCategory === 'all'}
            isDarkTheme={true}
            onClick={() => onSelectCategory('all')}
          />
        </div>

        {/* Post a Job CTA Card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 sm:p-6 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
          <div>
            <span className="text-xs font-semibold text-emerald-400 block mb-1">Need custom quotes?</span>
            <h3 className="text-base font-bold text-white">Post your task and let pros reach out</h3>
            <p className="text-xs text-slate-300 mt-0.5">Describe what you need and get responses from nearby experts.</p>
          </div>
          <button
            onClick={onOpenPostJob}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm shadow-xs whitespace-nowrap flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <span>Post a Task Free</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to Search & Post
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Akure Pros
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" /> Fast Local Response
          </span>
        </div>

      </div>
    </section>
  );
}
