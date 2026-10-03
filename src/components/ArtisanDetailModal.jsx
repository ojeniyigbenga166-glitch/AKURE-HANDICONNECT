import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Phone, MessageSquare, Clock, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function ArtisanDetailModal({ artisan, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !artisan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in duration-150">
        
        {/* Modal Header */}
        <div className="relative bg-[#0F766E] text-white p-6 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-xs"
              />
              {artisan.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-white text-[#0F766E] p-0.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{artisan.name}</h2>
                <span className="px-2.5 py-0.5 rounded-md bg-white/15 text-white text-xs font-semibold">
                  {artisan.badge}
                </span>
              </div>
              <p className="text-xs font-medium text-emerald-100 mt-0.5">{artisan.businessName}</p>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-emerald-50">
                <span className="flex items-center gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {artisan.rating} ({artisan.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" /> {artisan.completedJobs} Jobs
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-200" /> {artisan.responseTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Skills
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'portfolio'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Portfolio ({artisan.portfolio?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500" /> Reviews ({artisan.reviews?.length || 0})
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto text-slate-800">
          
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Bio */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">About</h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  {artisan.bio}
                </p>
              </div>

              {/* Akure Coverage */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Akure Neighborhood Coverage</h4>
                <div className="flex flex-wrap gap-1.5">
                  {artisan.districts.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs border border-slate-200 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-[#0F766E]" /> {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Starting Service Rate</span>
                  <span className="text-base font-extrabold text-slate-900">₦{artisan.startingRate.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium block">Status</span>
                  <span className="text-xs text-[#0F766E] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Identity Verified
                  </span>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Work Photos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {artisan.portfolio?.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Client Feedback</h4>
              {artisan.reviews?.map((rev) => (
                <div key={rev.id} className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{rev.name}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                        📍 {rev.district}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Contact <strong className="text-slate-800">{artisan.name}</strong> directly:
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${artisan.phone}`}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Phone className="w-3.5 h-3.5" /> Call {artisan.phone}
            </a>

            <a
              href={`https://wa.me/${artisan.whatsapp}?text=${encodeURIComponent(`Hello ${artisan.name}, I found your profile on Akure HandiConnect.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Pro
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
