import React from 'react';
import { X, User, Wrench, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuthSelectionModal({
  isOpen,
  onClose,
  onSelectClientPath,
  onSelectArtisanPath,
  onOpenSignIn
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-2">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Join Akure HandiConnect
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How would you like to join?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-sm mx-auto">
            Choose your account type below to get routed to your dedicated dashboard.
          </p>
        </div>

        {/* 2 Path Choice Cards */}
        <div className="space-y-4 pt-2">
          
          {/* PATH 1: AS A CLIENT */}
          <div
            onClick={onSelectClientPath}
            className="p-5 rounded-xl border border-slate-200 hover:border-[#0F766E] bg-slate-50 hover:bg-emerald-50/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0F766E] flex items-center justify-center shrink-0 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                <User className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    AS A CLIENT / HOMEOWNER
                  </h3>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-[#0F766E] px-2 py-0.5 rounded">
                    Hire Pros
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  I want to find verified local artisans in Akure, post jobs, and receive price quotes.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0F766E] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* PATH 2: AS AN ARTISAN */}
          <div
            onClick={onSelectArtisanPath}
            className="p-5 rounded-xl border border-slate-200 hover:border-[#0F766E] bg-slate-50 hover:bg-emerald-50/50 transition-all cursor-pointer group shadow-xs hover:shadow-md flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#0F766E] flex items-center justify-center shrink-0 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                <Wrench className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    AS AN ARTISAN / PROFESSIONAL
                  </h3>
                  <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Offer Trade
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  I am a skilled craftsman offering trade services in Akure and want WhatsApp job leads.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#0F766E] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>

        {/* Footer: Already have an account */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600 font-normal">
            Already have an account?{' '}
            <button
              onClick={onOpenSignIn}
              className="text-[#0F766E] font-bold hover:underline cursor-pointer"
            >
              Sign In to Your Dashboard
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
