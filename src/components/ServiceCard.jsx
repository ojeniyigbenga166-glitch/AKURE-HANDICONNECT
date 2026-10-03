import React from 'react';
import { Wrench, Zap, Cpu, Wind, Car, Hammer, Paintbrush, Sparkles, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  Wrench, Zap, Cpu, Wind, Car, Hammer, Paintbrush, Sparkles
};

export default function ServiceCard({ service, onClick }) {
  const IconComponent = ICON_MAP[service.icon] || Wrench;

  return (
    <div
      onClick={() => onClick(service.id)}
      className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0F766E] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-full"
    >
      <div>
        {/* Icon & Count */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5 stroke-[2]" />
          </div>

          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
            {service.activePros} Pros
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors mb-1.5">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          {service.description}
        </p>
      </div>

      {/* Action Link */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F766E]">
        <span>Browse Pros</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>

    </div>
  );
}
