import React from 'react';
import { PlusCircle, MessageSquareQuote, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenPostTask, onOpenBecomeTasker }) {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            How HandiConnect Works
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-normal">
            Getting skilled help in Akure is straightforward and takes less than two minutes.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-start shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] font-bold text-base mb-4 flex items-center justify-center border border-emerald-200">
              1
            </div>
            <div className="flex items-center gap-2 mb-2">
              <PlusCircle className="w-4 h-4 text-[#0F766E]" />
              <h3 className="text-base font-bold text-slate-900">Post Your Task</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
              Describe the service you need, choose your Akure neighborhood (e.g. Alagbaka, Ijapo, FUTA), and state your budget or ask for open quotes.
            </p>
            <span className="text-xs font-semibold text-[#0F766E] mt-auto flex items-center gap-1">
              Takes 60 seconds <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-start shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] font-bold text-base mb-4 flex items-center justify-center border border-emerald-200">
              2
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareQuote className="w-4 h-4 text-[#0F766E]" />
              <h3 className="text-base font-bold text-slate-900">Review Quotes</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
              Skilled artisans nearby receive your request and reply with quotes. Check their ratings, experience, and past work photos to pick the best match.
            </p>
            <span className="text-xs font-semibold text-[#0F766E] mt-auto flex items-center gap-1">
              Compare profiles <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-start shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0F766E] font-bold text-base mb-4 flex items-center justify-center border border-emerald-200">
              3
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
              <h3 className="text-base font-bold text-slate-900">Get It Done</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
              Confirm your chosen professional. They visit your location in Akure, complete the job, and you leave a verified review.
            </p>
            <span className="text-xs font-semibold text-[#0F766E] mt-auto flex items-center gap-1">
              Job done safely <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

        {/* Callout Banner */}
        <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Are you a skilled worker or artisan in Akure?</h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl font-normal">
              List your services, connect with local clients, and build your reputation on Akure HandiConnect.
            </p>
          </div>
          <button
            onClick={onOpenBecomeTasker}
            className="whitespace-nowrap px-6 py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
          >
            Register as a Pro
          </button>
        </div>

      </div>
    </section>
  );
}
