import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Wrench, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';
import { signInWithEmail, signUpClientUser, signUpArtisanUser } from '../services/authService';

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

  // Sync mode with initialMode whenever modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg('');
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignIn = (targetRole) => {
    setLoading(true);
    setTimeout(() => {
      const role = targetRole || (mode === 'signup-artisan' ? 'artisan' : 'client');
      const mockGoogleUser = {
        id: 'google-usr-' + Date.now(),
        email: email || (role === 'artisan' ? 'marvellous.artisan@gmail.com' : 'gmail.user@gmail.com'),
        name: fullName || (role === 'artisan' ? 'Marvellous Adebayo' : 'Gmail User'),
        businessName: businessName || (fullName ? `${fullName} Services` : 'Adebayo Electrical & Tech Pro'),
        phone: phone || '08031234567',
        district: district || 'Alagbaka (GRA & Extension)',
        role: role,
        category: category || 'electrical'
      };
      setLoading(false);
      onAuthenticate({ user: mockGoogleUser, role });
      onClose();
    }, 300);
  };

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
        const res = await signUpArtisanUser(
          email,
          password,
          fullName || businessName || 'Artisan Pro',
          phone || '08031234567',
          district || 'Alagbaka (GRA & Extension)',
          businessName || fullName || 'Artisan Services',
          category || 'electrical',
          experienceYears || 5,
          startingRate || 5000
        );
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.error || 'Artisan registration failed.');
          return;
        }
        onAuthenticate({
          user: {
            ...res.user,
            role: 'artisan'
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
            {mode === 'signup-artisan' && 'Sign up quickly & configure your profile, rates & WhatsApp line in Profile Settings.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* Quick Google Sign In Button */}
        <button
          type="button"
          onClick={() => handleGoogleSignIn(mode === 'signup-artisan' ? 'artisan' : undefined)}
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
          <span>Continue with Gmail / Google</span>
        </button>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">or continue with email</span>
        </div>

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
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          {/* Full Name for Signup */}
          {mode !== 'signin' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {mode === 'signup-artisan' ? 'Owner / Your Full Name' : 'Full Name'}
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

          {/* Akure Neighborhood District for Client */}
          {mode === 'signup-client' && (
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

          {mode === 'signup-artisan' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-900 font-normal leading-relaxed">
              💡 <strong>Instant Signup Notice:</strong> Detailed profile fields (WhatsApp line, starting rates, experience years, bio & coverage areas) can be set up & edited anytime in your <strong>Dashboard Profile Settings</strong>!
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
                  {mode === 'signin' && 'Sign In to Dashboard'}
                  {mode === 'signup-client' && 'Create Client Account'}
                  {mode === 'signup-artisan' && 'Quick Artisan Registration'}
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

