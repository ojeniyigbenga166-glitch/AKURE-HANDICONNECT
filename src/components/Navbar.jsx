import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

export default function Navbar({ onOpenPostJob, onOpenBecomePro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16 sm:h-20 shadow-xs w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Brand Logo Link */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shadow-xs group-hover:bg-[#115E59] transition-colors">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  AKURE <span className="text-[#0F766E]">HANDICONNECT</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Ondo State Local Skills Marketplace
              </p>
            </div>
          </Link>

          {/* Nav Links with NavLink */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
              }
            >
              My Dashboard
            </NavLink>
            <NavLink
              to="/artisans"
              className={({ isActive }) =>
                `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
              }
            >
              Find Artisans
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
              }
            >
              Live Task Board
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
              }
            >
              Browse Services
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
              }
            >
              How It Works
            </NavLink>
          </nav>

          {/* Desktop Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenBecomePro}
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#0F766E]" />
              <span>Become a Pro</span>
            </button>

            <button
              onClick={onOpenPostJob}
              className="px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Post a Task</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPostJob}
              className="px-3 py-1.5 rounded-lg bg-[#0F766E] text-white font-semibold text-xs shadow-xs"
            >
              Post Task
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0F766E] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <Link
            to="/artisans"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Find Artisans
          </Link>
          <Link
            to="/tasks"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Live Task Board
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Browse Services
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            How It Works
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBecomePro(); }}
              className="w-full text-center py-2.5 rounded-lg bg-slate-100 font-semibold text-xs text-slate-800 border border-slate-200"
            >
              Become a Professional
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
