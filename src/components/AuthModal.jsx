import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Wrench, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';
import { signInWithEmail, signUpClientUser } from '../services/authService';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signin', // 'signin' | 'signup-client' | 'signup-artisan'
  onAuthenticate
}) {
  const [mode, setMode] = useState(initialMode);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('electrical');
  const [district, setDistrict] = useState('Alagbaka (GRA & Extension)');
  const [experienceYears, setExperienceYears] = useState(5);
  const [startingRate, setStartingRate] = useState(5000);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'signin') {
        const res = await signInWithEmail(email, password);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to sign in. Please verify your email & password.');
          return;
        }
        onAuthenticate({ user: res.user, role: res.role });
        onClose();
      } else if (mode === 'signup-client') {
        const res = await signUpClientUser(email, password, fullName, phone, district);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.error || 'Client registration failed.');
          return;
        }
        onAuthenticate({ user: res.user, role: 'client' });
        onClose();
      } else if (mode === 'signup-artisan') {
        const res = await signUpClientUser(email, password, fullName || businessName, phone, district);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.error || 'Artisan registration failed.');
          return;
        }
        onAuthenticate({
          user: {
            ...res.user,
            businessName: businessName || fullName,
            role: 'artisan',
            category,
            experienceYears,
            startingRate
          },
          role: 'artisan'
        });
        onClose();
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication encountered an issue.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {mode === 'signin' && 'Sign In to Your Account'}
            {mode === 'signup-client' && '👤 Client Account Registration'}
            {mode === 'signup-artisan' && '🛠️ Artisan Pro Registration'}
          </span>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup-client' && 'Hire Artisans in Akure'}
            {mode === 'signup-artisan' && 'Grow Your Trade Business'}
          </h2>

          <p className="text-xs text-slate-500 font-normal">
            {mode === 'signin' && 'Access your posted tasks, quotes, and artisan chat history.'}
            {mode === 'signup-client' && 'Post jobs and receive price quotes from local pros.'}
            {mode === 'signup-artisan' && 'Receive direct WhatsApp job alerts from clients in Akure.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* Mode Navigation Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup-client')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'signup-client'
                ? 'bg-white text-[#0F766E] font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👤 Client
          </button>
          <button
            type="button"
            onClick={() => setMode('signup-artisan')}
            className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'signup-artisan'
                ? 'bg-white text-[#0F766E] font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛠️ Artisan
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Full Name for Signup */}
          {mode !== 'signin' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {mode === 'signup-artisan' ? 'Owner / Contact Person Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marvellous Adebayo"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          )}

          {/* Business Name for Artisan Signup */}
          {mode === 'signup-artisan' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Artisan / Business Name</label>
              <div className="relative">
                <Wrench className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Gbenga Tech & Electricals"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

          {/* Nigerian Phone Number for Artisan Signup */}
          {mode === 'signup-artisan' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                WhatsApp & Contact Line (for Job Alerts)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0803 123 4567"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          )}

          {/* Trade Category for Artisan Signup */}
          {mode === 'signup-artisan' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Trade Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Akure Neighborhood District */}
          {mode !== 'signin' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Akure Neighborhood</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
              >
                {AKURE_DISTRICTS.filter(d => d !== 'All Akure Areas').map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {/* Starting Rate for Artisan */}
          {mode === 'signup-artisan' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Years Experience</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Starting Rate (₦)</label>
                <input
                  type="number"
                  step="1000"
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {mode === 'signin' && 'Sign In to Dashboard'}
                  {mode === 'signup-client' && 'Create Client Account'}
                  {mode === 'signup-artisan' && 'Register Artisan Pro Profile'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
