import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, ArrowRight, UserCheck, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({
  onOpenPostJob,
  onOpenBecomePro,
  currentUser = null,
  onOpenAuthSelection,
  onSignOut
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
            {currentUser && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `transition-colors py-1 ${isActive ? 'text-[#0F766E] font-bold border-b-2 border-[#0F766E]' : 'hover:text-[#0F766E]'}`
                }
              >
                My Dashboard
              </NavLink>
            )}
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
          <div className="hidden lg:flex items-center gap-3">
            
            {/* User Session Status */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[#0F766E] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#0F766E]" />
                  <span>{currentUser.name.split(' ')[0]}</span>
                  {currentUser.role === 'artisan' && (
                    <span className="text-[10px] bg-[#0F766E] text-white px-1.5 py-0.2 rounded font-extrabold">PRO</span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 text-xs font-semibold z-50 animate-in fade-in">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#0F766E]"
                    >
                      📊 My Dashboard
                    </Link>
                    <button
                      onClick={() => { setUserDropdownOpen(false); onSignOut && onSignOut(); }}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthSelection}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={onOpenPostJob}
              className="px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="For Clients looking to hire an Artisan"
            >
              <span>Post a Task</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {!currentUser && (
              <button
                onClick={onOpenAuthSelection}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200"
              >
                Sign In
              </button>
            )}

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
          {currentUser && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E]"
            >
              My Dashboard
            </Link>
          )}
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

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onSignOut && onSignOut(); }}
                className="w-full text-center py-2.5 rounded-lg bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200"
              >
                Sign Out ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuthSelection(); }}
                className="w-full text-center py-2.5 rounded-lg bg-[#0F766E] text-white font-semibold text-xs shadow-xs"
              >
                Sign In / Register Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
