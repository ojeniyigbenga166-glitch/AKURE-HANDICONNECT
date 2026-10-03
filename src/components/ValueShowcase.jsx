import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Play, Phone, MessageSquare, TrendingUp, Smartphone, BookOpen, Sparkles } from 'lucide-react';

export default function ValueShowcase({ onOpenPostJob, onOpenBecomePro, onSelectCategory }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION 1: HandiConnect Pro Banner (Deep Dark Teal Card) */}
        <div className="bg-[#0F766E] text-white rounded-2xl p-6 sm:p-10 border border-emerald-800 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-emerald-100 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" /> HandiConnect Pro
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let verified local experts handle your home & office repairs
            </h2>

            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-50 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0 mt-0.5" />
                <span>Dedicated matching for homes, offices, & commercial shops in Akure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0 mt-0.5" />
                <span>NIN verified electricians, plumbers & mechanics with background checks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0 mt-0.5" />
                <span>Upfront transparent quotes with zero hidden fees</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPostJob}
                className="px-5 py-3 rounded-lg bg-white hover:bg-emerald-50 text-[#0F766E] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>Hire a Pro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-emerald-100 font-medium flex items-center gap-1">
                ⚡ Avg 15-min response in Akure
              </span>
            </div>
          </div>

          {/* Right Image Graphic */}
          <div className="w-full md:w-5/12 shrink-0 relative">
            <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                alt="Akure Professional Artisan"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <p className="font-bold">Engr. Gbenga Adebayo</p>
                  <p className="text-[11px] text-emerald-200">Gold Verified Electrical Pro • Alagbaka GRA</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: For Local Artisans & Increasing Sales (Rich Dark Burgundy / Slate Card) */}
        <div className="bg-[#4A1D24] text-white rounded-2xl p-6 sm:p-10 border border-rose-900 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-rose-200 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-rose-200" /> Grow Your Artisan Business
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Increase your monthly sales & get daily customer requests in Akure
            </h2>

            <p className="text-xs sm:text-sm text-rose-100 font-normal leading-relaxed">
              Designed for simplicity — <strong>no complicated technology or tech experience needed</strong>. Receive customer requests straight to your phone via WhatsApp or SMS.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 p-3 rounded-lg border border-white/15 text-left">
                <Smartphone className="w-4 h-4 text-rose-300 mb-1" />
                <h4 className="text-xs font-bold text-white">Easy WhatsApp Alerts</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Simple alerts sent directly to your phone</p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg border border-white/15 text-left">
                <TrendingUp className="w-4 h-4 text-rose-300 mb-1" />
                <h4 className="text-xs font-bold text-white">3x More Clients</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Connect with clients in Alagbaka, Ijapo & FUTA</p>
              </div>

              <div className="bg-white/10 p-3 rounded-lg border border-white/15 text-left">
                <Sparkles className="w-4 h-4 text-rose-300 mb-1" />
                <h4 className="text-xs font-bold text-white">100% Free Sign Up</h4>
                <p className="text-[11px] text-rose-200 mt-0.5">Zero registration fees to join the directory</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBecomePro}
                className="px-6 py-3 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>Join as an Artisan Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Profile Card Graphic */}
          <div className="w-full md:w-5/12 shrink-0">
            <div className="bg-white text-slate-900 rounded-xl p-5 border border-rose-200 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                  alt="Artisan Profile"
                  className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sunday "Sumec" Ojo</h4>
                  <p className="text-xs font-semibold text-[#0F766E]">Ojo Generator Repair • Fanibi Akure</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                    ✓ Received 14 client leads this week
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 border border-slate-200 italic font-normal">
                "HandiConnect is so easy. I don't need a laptop or app — I just get WhatsApp calls from customers in Ijapo and Alagbaka. My daily income doubled in 1 month!"
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: What Success Looks Like (Video Showcase) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What success on HandiConnect looks like
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-normal">
                Real experiences from Akure residents, homeowners, and local business owners.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
            {/* Video Thumbnail area */}
            <div className="lg:col-span-7 relative bg-slate-900 aspect-video lg:aspect-auto flex items-center justify-center group cursor-pointer" onClick={() => setIsPlayingVideo(!isPlayingVideo)}>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80"
                alt="HandiConnect Success Story"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#0F766E] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-[#0F766E] ml-1" />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                ▶ Case Study: Emergency Generator Repair in Ijapo (2:15)
              </span>
            </div>

            {/* Testimonial Quote details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
              <div>
                <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block mb-2">Verified Case Study</span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  "Got our office generator back up in 25 minutes during a critical presentation."
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-3 font-normal">
                  Dr. Femi Ogundele from Alagbaka shares how Akure HandiConnect solved an urgent power fault before a major client meeting.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80"
                  alt="Dr. Femi Ogundele"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">Dr. Femi Ogundele</p>
                  <p className="text-[11px] text-slate-500 font-medium">Business Owner • Alagbaka GRA, Akure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Helpful Guides (3 Column Grid) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Guides to help you grow & get work done
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-normal">
                Practical advice for Akure residents and local trade professionals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Guide 1 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80"
                alt="Guide 1"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-2">
                <span className="text-[11px] font-semibold text-[#0F766E] uppercase tracking-wider">Hiring Tips</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
                  How to safely hire verified electricians in Alagbaka & Ijapo
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                  Learn what certificates to check and how to get guaranteed transparent pricing for house wiring.
                </p>
              </div>
            </div>

            {/* Guide 2 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer" onClick={onOpenBecomePro}>
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80"
                alt="Guide 2"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-2">
                <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">For Artisans</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
                  How non-tech artisans use WhatsApp to get daily jobs in Akure
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                  Step-by-step guide for mechanics, plumbers, and carpenters to register and receive direct phone calls.
                </p>
              </div>
            </div>

            {/* Guide 3 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80"
                alt="Guide 3"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 space-y-2">
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">Maintenance</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
                  Top 5 generator servicing tips to prevent sudden breakdowns
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                  Keep your Sumec Firman or Mikano generator running smoothly with routine local oil changes.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 5: Bottom Callout Banner (Services at your fingertips) */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 text-center space-y-4 shadow-md">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skilled local services at your <span className="text-emerald-400">fingertips</span> in Akure
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-normal">
            Whether you need emergency repairs today or want to grow your artisan business, HandiConnect connects you directly across Ondo State.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onOpenPostJob}
              className="px-6 py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
            >
              Post a Task Free
            </button>
            <button
              onClick={onOpenBecomePro}
              className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Become a Pro
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
