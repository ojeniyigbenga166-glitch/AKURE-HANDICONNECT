import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Wrench, Sparkles, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';
import { signInWithEmail, signUpClientUser, signUpArtisanUser } from '../services/authService';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'client', // 'client' | 'artisan' | 'signin' | 'signup-client' | 'signup-artisan'
  onAuthenticate
}) {
  const [roleMode, setRoleMode] = useState(
    initialMode === 'signup-artisan' || initialMode === 'artisan' ? 'artisan' : 'client'
  );
  // authSubMode is null initially so form is hidden until Sign In or Sign Up button is clicked to pop down!
  const [authSubMode, setAuthSubMode] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('electrical');
  const [district, setDistrict] = useState('Alagbaka (GRA & Extension)');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync role when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      if (initialMode === 'signin') {
        setAuthSubMode('signin');
        setRoleMode('client');
      } else if (initialMode === 'signup-artisan' || initialMode === 'artisan') {
        setRoleMode('artisan');
        setAuthSubMode(null); // Keep form pop-down hidden until user clicks
      } else {
        setRoleMode('client');
        setAuthSubMode(null); // Keep form pop-down hidden until user clicks
      }
      setErrorMsg('');
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const selectedRole = roleMode;
      const mockGoogleUser = {
        id: 'google-usr-' + Date.now(),
        email: email || (selectedRole === 'artisan' ? 'marvellous.artisan@gmail.com' : 'lorencedock123@gmail.com'),
        name: fullName || (selectedRole === 'artisan' ? 'Marvellous Adebayo' : 'Gbenga'),
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
      if (authSubMode === 'signin') {
        // Sign In Flow (Email & Password only)
        const res = await signInWithEmail(email, password);
        setLoading(false);
        if (!res.success) {
          setErrorMsg(res.error || 'Sign in failed. Please check your email and password.');
          return;
        }
        onAuthenticate({ user: { ...res.user, role: selectedRole }, role: selectedRole });
        onClose();
      } else {
        // Sign Up Flow
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
            setErrorMsg(res.error || 'Artisan registration failed.');
            return;
          }
          onAuthenticate({ user: { ...res.user, role: 'artisan' }, role: 'artisan' });
          onClose();
        } else {
          // Client Registration
          const res = await signUpClientUser(email, password, fullName || 'Gbenga', '08031234567', district);
          setLoading(false);
          if (!res.success) {
            setErrorMsg(res.error || 'Client account registration failed.');
            return;
          }
          onAuthenticate({ user: { ...res.user, role: 'client' }, role: 'client' });
          onClose();
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication encountered an issue.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5 max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0F766E] border border-emerald-200 text-xs font-extrabold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{roleMode === 'artisan' ? '🛠️ Artisan Pro Portal' : '👤 Client Portal'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {roleMode === 'artisan' ? 'Artisan Pro Access' : 'Client Account Access'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xs mx-auto leading-relaxed">
            {roleMode === 'artisan'
              ? 'Access live task leads in Akure, submit quotes & manage your pro profile.'
              : 'Post repair jobs, receive artisan price quotes & hire verified pros.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-2xs animate-in slide-in-from-top-1">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="font-bold ml-2 text-rose-500 hover:text-rose-800">✕</button>
          </div>
        )}

        {/* 1. Primary Role Selection Tabs: Client vs Artisan */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-extrabold border border-slate-200/80 shadow-inner">
          <button
            type="button"
            onClick={() => setRoleMode('client')}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleMode === 'client'
                ? 'bg-white text-[#0F766E] shadow-sm border border-emerald-200 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-[#0F766E]" />
            <span>Client</span>
          </button>
          <button
            type="button"
            onClick={() => setRoleMode('artisan')}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleMode === 'artisan'
                ? 'bg-white text-[#0F766E] shadow-sm border border-emerald-200 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4 text-[#0F766E]" />
            <span>Artisan Pro</span>
          </button>
        </div>

        {/* Quick Google 1-Click Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 rounded-2xl border border-slate-250 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:border-slate-300"
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
          <span className="bg-white px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider shrink-0">or select option to pop down form</span>
        </div>

        {/* 2. Action Choice Buttons: Sign In vs Sign Up (Pops Down Form) */}
        <div className="grid grid-cols-2 gap-2.5 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => setAuthSubMode(authSubMode === 'signin' ? null : 'signin')}
            className={`py-3 px-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authSubMode === 'signin'
                ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-250 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${authSubMode === 'signin' ? 'rotate-180' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setAuthSubMode(authSubMode === 'signup' ? null : 'signup')}
            className={`py-3 px-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authSubMode === 'signup'
                ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-250 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${authSubMode === 'signup' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* POP-DOWN FORM: Hidden until user clicks Sign In or Sign Up button! */}
        {authSubMode && (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl text-[11px] font-bold text-[#0F766E] flex items-center justify-between">
              <span>{authSubMode === 'signup' ? '✨ New Account Registration Form' : '🔑 Existing Account Sign In'}</span>
              <span className="text-slate-500 font-normal">Pop-down Form</span>
            </div>

            {/* Full Name (ONLY SHOWN FOR SIGN UP) */}
            {authSubMode === 'signup' && (
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">
                  {roleMode === 'artisan' ? 'Owner / Your Full Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={roleMode === 'artisan' ? 'e.g. Marvellous Adebayo' : 'e.g. Gbenga'}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0F766E] shadow-2xs"
                  />
                </div>
              </div>
            )}

            {/* Email Address (ALWAYS SHOWN WHEN FORM POPS DOWN) */}
            <div>
              <label className="block font-extrabold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lorencedock123@gmail.com"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0F766E] shadow-2xs"
                />
              </div>
            </div>

            {/* Password (ALWAYS SHOWN WHEN FORM POPS DOWN) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-extrabold text-slate-700">Password</label>
                {authSubMode === 'signin' && (
                  <button type="button" onClick={() => alert('Password reset link sent to your registered email.')} className="text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0F766E] shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Trade Category for Artisan (ONLY SHOWN FOR SIGN UP) */}
            {authSubMode === 'signup' && roleMode === 'artisan' && (
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Primary Trade Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0F766E] shadow-2xs"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Primary Akure Neighborhood for Client (ONLY SHOWN FOR SIGN UP) */}
            {authSubMode === 'signup' && roleMode === 'client' && (
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Primary Akure Neighborhood</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0F766E] shadow-2xs"
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
              className="w-full py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>
                    {authSubMode === 'signin'
                      ? `Sign In to ${roleMode === 'artisan' ? 'Artisan' : 'Client'} Dashboard`
                      : `Create ${roleMode === 'artisan' ? 'Artisan Pro' : 'Client'} Account`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
