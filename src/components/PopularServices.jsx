import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { POPULAR_SERVICES } from '../data/services';

export default function PopularServices({ onSelectService }) {
  const [showAllServices, setShowAllServices] = useState(false);

  // Show top 4 services in a single row by default
  const displayedServices = showAllServices ? POPULAR_SERVICES : POPULAR_SERVICES.slice(0, 4);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Local Akure Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            Popular services in Akure
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-normal">
            Select a service category to find verified local professionals in your area.
          </p>
        </div>

        {/* Card Grid: 4 items in a single row */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={onSelectService}
              />
            ))}
          </div>

          {/* Expand Toggle Button with Small Arrow */}
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0F766E] font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all cursor-pointer group"
            >
              <span>
                {showAllServices
                  ? 'Show Less Services'
                  : `View All ${POPULAR_SERVICES.length} Popular Services in Akure`}
              </span>
              {showAllServices ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
