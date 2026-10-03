import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, MessageSquare, Award, Eye, Search } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';

export default function ArtisansDirectory({
  artisans,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDistrict,
  setSelectedDistrict,
  onSelectArtisan,
  onOpenBecomeTasker
}) {
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Filter artisans
  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = searchQuery === '' ||
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.districts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || artisan.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || artisan.districts.includes(selectedDistrict);
    const matchesVerified = !onlyVerified || artisan.isVerified;

    return matchesSearch && matchesCategory && matchesDistrict && matchesVerified;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Artisans in Akure
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold border border-emerald-200">
              {filteredArtisans.length} Available
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Compare client reviews, view work portfolios, and hire skilled professionals directly.
          </p>
        </div>

        <button
          onClick={onOpenBecomeTasker}
          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all"
        >
          + Join as an Artisan
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          
          {/* Trade Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Trade Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Akure Area</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
            >
              {AKURE_DISTRICTS.map((d, i) => (
                <option key={i} value={i === 0 ? 'all' : d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="pt-4 sm:pt-4 flex items-center">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 accent-[#0F766E] rounded cursor-pointer"
              />
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              Only Verified Artisans
            </label>
          </div>

          {/* Reset Filters */}
          <div className="pt-4 sm:pt-4">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDistrict('all');
                setSearchQuery('');
                setOnlyVerified(false);
              }}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 transition-all"
            >
              Reset Filters
            </button>
          </div>

        </div>
      </div>

      {/* Artisans Grid */}
      {filteredArtisans.length === 0 ? (
        <div className="text-center py-14 bg-white border border-slate-200 rounded-xl p-8">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No artisans match your filters</h3>
          <p className="text-slate-500 text-xs mt-1">Try switching categories or expanding your location filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white border border-slate-200 hover:border-[#0F766E] rounded-xl p-5 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group"
            >
              <div>
                
                {/* Header: Avatar & Info */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    {artisan.isVerified && (
                      <span className="absolute -bottom-1 -right-1 bg-[#0F766E] text-white p-0.5 rounded-full shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div>
                    <Link to={`/artisan/${artisan.id}`} className="group-hover:text-[#0F766E] transition-colors">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E]">
                        {artisan.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#0F766E]">{artisan.businessName}</p>
                    </Link>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {artisan.rating}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>{artisan.reviewsCount} reviews</span>
                      <span className="text-slate-300">•</span>
                      <span>{artisan.completedJobs} jobs</span>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                  <Award className="w-3.5 h-3.5 text-[#0F766E]" /> {artisan.badge} ({artisan.experienceYears} yrs exp)
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 font-normal">
                  {artisan.bio}
                </p>

                {/* Locations */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">Coverage Areas:</span>
                  <div className="flex flex-wrap gap-1">
                    {artisan.districts.slice(0, 3).map((district, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0F766E]" /> {district.split(' ')[0]}
                      </span>
                    ))}
                    {artisan.districts.length > 3 && (
                      <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-200">
                        +{artisan.districts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Card Footer: Starting Price & Action Buttons */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Starting Rate</span>
                  <span className="text-sm font-extrabold text-slate-900">₦{artisan.startingRate.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(`Hello ${artisan.name}, I saw your profile on Akure HandiConnect.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F766E] border border-emerald-200 transition-all"
                    title="WhatsApp Artisan"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  <Link
                    to={`/artisan/${artisan.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Profile
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
