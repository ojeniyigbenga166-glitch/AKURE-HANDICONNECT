import React, { useState } from 'react';
import { X, UserCheck, Check } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';

export default function BecomeTaskerModal({ isOpen, onClose, onRegisterArtisan }) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('electrical');
  const [experienceYears, setExperienceYears] = useState('');
  const [startingRate, setStartingRate] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState(['Alagbaka (GRA & Extension)', 'Ijapo Estate']);
  const [bio, setBio] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDistrictToggle = (district) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter(d => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !bio) return;

    const newArtisan = {
      id: `art-${Date.now()}`,
      name,
      businessName: businessName || `${name} Services`,
      category,
      categoryName: CATEGORIES.find(c => c.id === category)?.name || 'Skilled Services',
      rating: 5.0,
      reviewsCount: 1,
      completedJobs: 1,
      badge: 'New Pro in Akure',
      isVerified: true,
      experienceYears: parseInt(experienceYears, 10) || 3,
      startingRate: parseInt(startingRate, 10) || 5000,
      phone,
      whatsapp: whatsapp || phone.replace('+', '').replace(/\s+/g, ''),
      districts: selectedDistricts.length > 0 ? selectedDistricts : ['Alagbaka (GRA & Extension)'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio,
      responseTime: '< 15 minutes',
      portfolio: [
        { title: 'Sample Completed Project in Akure', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80' }
      ],
      reviews: [
        { id: 'rnew', name: 'Akure Client', district: selectedDistricts[0] || 'Alagbaka', rating: 5, date: 'Today', comment: 'Welcome to HandiConnect!' }
      ]
    };

    onRegisterArtisan(newArtisan);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl overflow-hidden shadow-xl animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Register as an Artisan in Akure</h3>
              <p className="text-xs text-slate-500 font-normal">Connect with local clients across Alagbaka, Ijapo, FUTA & Ondo State.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Welcome to Akure HandiConnect!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your profile is now active in the directory. You can start receiving client requests right away.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
            
            {/* Full Name & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunday Ojo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ojo Generator Repair"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Trade Category & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Trade *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Exp *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 8"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Phone & Starting Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +2348031234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Rate (₦) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>
            </div>

            {/* Operational Zones */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Akure Coverage Zones</label>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                {AKURE_DISTRICTS.filter(d => d !== 'All Akure Areas').map((d, i) => {
                  const isSelected = selectedDistricts.includes(d);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleDistrictToggle(d)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#0F766E] text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{d.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Overview *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your qualifications, specific repair brands, or services offered..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-4 h-4" /> Complete Registration
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
