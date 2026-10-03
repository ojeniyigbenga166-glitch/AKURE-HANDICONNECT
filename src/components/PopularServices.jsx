import React from 'react';
import ServiceCard from './ServiceCard';
import { POPULAR_SERVICES } from '../data/services';

export default function PopularServices({ onSelectService }) {
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

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={onSelectService}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
