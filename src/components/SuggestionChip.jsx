import React from 'react';
import { Wrench, Zap, Wind, Cpu, Car, Hammer, Sparkles, Paintbrush, ChevronDown } from 'lucide-react';

const ICON_MAP = {
  Wrench, Zap, Wind, Cpu, Car, Hammer, Sparkles, Paintbrush
};

export default function SuggestionChip({ chip, isSelected, isDarkTheme, onClick }) {
  if (chip.isMore) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all shrink-0 ${
          isSelected
            ? 'bg-[#0F766E] text-white border-[#0F766E]'
            : isDarkTheme
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
        }`}
      >
        <span>All Categories</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    );
  }

  const IconComponent = ICON_MAP[chip.icon] || Wrench;

  return (
    <button
      onClick={() => onClick(chip.category)}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all shrink-0 ${
        isSelected
          ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
          : isDarkTheme
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
      }`}
    >
      <IconComponent className="w-3.5 h-3.5 text-emerald-400" />
      <span>{chip.label}</span>
    </button>
  );
}
