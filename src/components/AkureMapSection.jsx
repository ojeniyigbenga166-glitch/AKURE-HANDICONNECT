import React, { useState } from 'react';
import { MapPin, Clock, Wrench, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { AKURE_NEIGHBORHOOD_STATS } from '../data/mockData';

export default function AkureMapSection({ onSelectDistrict, isRegistered = false, onOpenRegisterModal }) {
  const [showAllNeighborhoods, setShowAllNeighborhoods] = useState(false);

  // Display top 3 neighborhoods by default
  const displayedNeighborhoods = (showAllNeighborhoods || isRegistered)
    ? AKURE_NEIGHBORHOOD_STATS
    : AKURE_NEIGHBORHOOD_STATS.slice(0, 3);

  const remainingCount = AKURE_NEIGHBORHOOD_STATS.length - 3;

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0F766E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
              Akure Coverage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
              Neighborhood Explorer
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl font-normal">
              Select any neighborhood below to view available verified artisans in that district.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span>Verified Local Coverage in Ondo State</span>
          </div>
        </div>

        {/* Neighborhood Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedNeighborhoods.map((zone, idx) => (
              <div
                key={idx}
                onClick={() => onSelectDistrict(zone.name)}
                className="bg-slate-50 border border-slate-200 hover:border-[#0F766E] rounded-xl p-5 transition-all cursor-pointer group shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4 stroke-[2]" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                        {zone.name}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-[#0F766E] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {zone.activePros} Pros
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3.5 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5 text-[#0F766E]" /> Top Service:</span>
                      <strong className="text-slate-800 font-semibold">{zone.topService}</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" /> Avg Response:</span>
                      <strong className="text-[#0F766E] font-semibold">{zone.avgResponse}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-semibold text-[#0F766E]">
                  <span>Explore Pros in {zone.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>

              </div>
            ))}
          </div>

          {/* SEE MORE NEIGHBORHOODS BUTTON / REGISTRATION GATING */}
          {!showAllNeighborhoods && !isRegistered && remainingCount > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-slate-800 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Unlock All Akure Coverage Areas
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-normal">
                  Register free as a client or artisan to access pros across Oke-Aro, Fanibi, Ondo Road, Oda Road, Arakale & all Ondo State districts.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onOpenRegisterModal}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  Register Free to See All Neighborhoods
                </button>
                <button
                  onClick={() => setShowAllNeighborhoods(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                >
                  Preview All ({remainingCount} more)
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
