import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';
import { signInWithEmail, signUpClientUser, signUpArtisanUser } from '../services/authService';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'client', // 'client' | 'artisan' | 'signup-client' | 'signup-artisan'
  onAuthenticate
}) {
  const [roleMode, setRoleMode] = useState(
    initialMode === 'signup-artisan' || initialMode === 'artisan' ? 'artisan' : 'client'
  );

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('electrical');
  const [district, setDistrict] = useState('Alagbaka (GRA & Extension)');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync role mode when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      const targetRole = initialMode === 'signup-artisan' || initialMode === 'artisan' ? 'artisan' : 'client';
      setRoleMode(targetRole);
      setErrorMsg('');
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedRole = roleMode; // 'client' or 'artisan'
      const mockGoogleUser = {
        id: 'google-usr-' + Date.now(),
        email: email || (selectedRole === 'artisan' ? 'marvellous.artisan@gmail.com' : 'client.user@gmail.com'),
        name: fullName || (selectedRole === 'artisan' ? 'Marvellous Adebayo' : 'Akure Client'),
        businessName: fullName ? `${fullName} Services` : 'Adebayo Electrical & Tech Pro',
        phone: '08031234567',
        district: district || 'Alagbaka (GRA & Extension)',
        role: selectedRole,
        category: category || 'electrical'
      };
      setLoading(false);
      onAuthenticate({ user: mockGoogleUser, role: selectedRole });
      onClose();
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const selectedRole = roleMode; // 'client' or 'artisan'

    try {
      if (selectedRole === 'artisan') {
        const res = await signUpArtisanUser(
          email,
          password,
          fullName || 'Artisan Pro',
          '08031234567',
          district || 'Alagbaka (GRA & Extension)',
          fullName || 'Artisan Services',
          category || 'electrical',
          5,
          5000
        );
        setLoading(false);
        if (!res.success) {
          const signInRes = await signInWithEmail(email, password);
          if (!signInRes.success) {
            setErrorMsg(signInRes.error || 'Artisan sign in failed.');
            return;
          }
          onAuthenticate({ user: { ...signInRes.user, role: 'artisan' }, role: 'artisan' });
          onClose();
          return;
        }
        onAuthenticate({
          user: { ...res.user, role: 'artisan' },
          role: 'artisan'
        });
        onClose();
      } else {
        // Client Mode
        const res = await signUpClientUser(email, password, fullName || 'Client', '08031234567', district);
        setLoading(false);
        if (!res.success) {
          const signInRes = await signInWithEmail(email, password);
          if (!signInRes.success) {
            setErrorMsg(signInRes.error || 'Client sign in failed.');
            return;
          }
          onAuthenticate({ user: { ...signInRes.user, role: 'client' }, role: 'client' });
          onClose();
          return;
        }
        onAuthenticate({ user: { ...res.user, role: 'client' }, role: 'client' });
        onClose();
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication encountered an issue.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
        
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
            {roleMode === 'artisan' ? '🛠️ Artisan Pro Access' : '👤 Client Account Access'}
          </span>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
            {roleMode === 'artisan' ? 'Sign In / Register as Artisan' : 'Sign In / Register as Client'}
          </h2>

          <p className="text-xs text-slate-500 font-normal">
            {roleMode === 'artisan'
              ? 'Access live task leads in Akure, submit quotes & manage your pro profile.'
              : 'Post repair jobs, receive artisan price quotes & hire verified pros.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* 2 Role Buttons: Client & Artisan (Removed standalone Sign In button) */}
        <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold border border-slate-200">
          <button
            type="button"
            onClick={() => setRoleMode('client')}
            className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleMode === 'client'
                ? 'bg-white text-[#0F766E] font-extrabold shadow-sm border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👤 Client</span>
          </button>
          <button
            type="button"
            onClick={() => setRoleMode('artisan')}
            className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleMode === 'artisan'
                ? 'bg-white text-[#0F766E] font-extrabold shadow-sm border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛠️ Artisan</span>
          </button>
        </div>

        {/* Quick Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>Continue with Gmail / Google ({roleMode === 'artisan' ? 'Artisan' : 'Client'})</span>
        </button>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">or with email</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {roleMode === 'artisan' ? 'Owner / Your Full Name' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={roleMode === 'artisan' ? 'e.g. Marvellous Adebayo' : 'e.g. Femi Ogundele'}
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
              />
            </div>
          </div>

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

          {/* Trade Category for Artisan */}
          {roleMode === 'artisan' && (
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

          {/* Akure Neighborhood District for Client */}
          {roleMode === 'client' && (
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {roleMode === 'artisan' ? 'Open Artisan Pro Dashboard 🛠️' : 'Open Client Dashboard 👤'}
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
