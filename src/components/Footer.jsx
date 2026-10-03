import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenPostJob, onOpenBecomePro }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-10 w-full border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-[#0F766E] flex items-center justify-center text-white font-bold shadow-xs">
                <Wrench className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AKURE <span className="text-[#0F766E]">HANDICONNECT</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              Akure's local services directory. Connecting residents in Alagbaka, Ijapo, FUTA & across Ondo State with trusted plumbers, electricians, generator mechanics & artisans.
            </p>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <MapPin className="w-4 h-4 text-[#0F766E]" />
              <span>Akure, Ondo State, Nigeria</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Clients</h4>
            <ul className="space-y-2 font-normal text-slate-400">
              <li>
                <button onClick={onOpenPostJob} className="hover:text-white transition-colors cursor-pointer">
                  Post a Task Free
                </button>
              </li>
              <li>
                <Link to="/artisans" className="hover:text-white transition-colors">
                  Find Local Artisans
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="hover:text-white transition-colors">
                  Browse Open Tasks
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Popular Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Professional Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Professionals</h4>
            <ul className="space-y-2 font-normal text-slate-400">
              <li>
                <button onClick={onOpenBecomePro} className="hover:text-white transition-colors cursor-pointer">
                  Register as an Artisan Free
                </button>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How HandiConnect Works
                </Link>
              </li>
              <li>
                <span className="text-slate-400">WhatsApp Alert System</span>
              </li>
            </ul>
          </div>

          {/* Local Support */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Support</h4>
            <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-lg text-xs space-y-1.5">
              <span className="text-slate-300 block font-medium">Need assistance?</span>
              <a href="tel:0800HANDICONNECT" className="text-emerald-400 font-bold flex items-center gap-1.5 hover:underline text-xs">
                <PhoneCall className="w-3.5 h-3.5" /> 0800-HANDI-CONNECT
              </a>
              <span className="text-[10px] text-slate-400 block">Mon-Sat • 8:00 AM - 6:00 PM</span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 font-normal">
          <p>© {new Date().getFullYear()} Akure HandiConnect. Built for Ondo State.</p>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span>Verified Local Artisans Directory</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
