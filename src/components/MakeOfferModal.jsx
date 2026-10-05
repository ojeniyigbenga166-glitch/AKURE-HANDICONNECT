import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';

export default function MakeOfferModal({ isOpen, onClose, job, onSubmitOffer, currentUser }) {
  const [artisanName, setArtisanName] = useState(currentUser?.name || currentUser?.businessName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [offerPrice, setOfferPrice] = useState('');
  const [arrivalTime, setArrivalTime] = useState('30 minutes');
  const [pitch, setPitch] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name || currentUser.businessName) {
        setArtisanName(currentUser.businessName || currentUser.name);
      }
      if (currentUser.phone) {
        setPhone(currentUser.phone);
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artisanName || !offerPrice || !pitch) return;

    onSubmitOffer(job.id, {
      artisanName,
      phone,
      offerPrice: parseInt(offerPrice, 10),
      arrivalTime,
      pitch
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setArtisanName('');
      setOfferPrice('');
      setPitch('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-[11px] font-semibold text-[#0F766E] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 uppercase tracking-wider">
              Submit Artisan Quote
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{job.title}</h3>
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
            <h4 className="text-lg font-bold text-slate-900">Quote Submitted Successfully</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              {job.postedBy} in {job.district} has received your quote alert and will contact you directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            
            {/* Task Info Summary */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Client: <strong className="text-slate-900">{job.postedBy}</strong></span>
                <span>Area: <strong className="text-[#0F766E]">{job.district}</strong></span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                <span>Client Budget:</span>
                <strong className="text-slate-900">₦{job.budgetAmount.toLocaleString()}</strong>
              </div>
            </div>

            {/* Artisan Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Business *</label>
              <input
                type="text"
                required
                placeholder="e.g. Engr. Gbenga Adebayo"
                value={artisanName}
                onChange={(e) => setArtisanName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
              <input
                type="text"
                required
                placeholder="e.g. 08031234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* Price & Arrival Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quote Price (₦) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 12000"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Arrival *</label>
                <select
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                >
                  <option value="15-20 minutes">15-20 minutes</option>
                  <option value="30-45 minutes">30-45 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="Tomorrow Morning">Tomorrow Morning</option>
                </select>
              </div>
            </div>

            {/* Pitch */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Pitch / Notes *</label>
              <textarea
                rows={3}
                required
                placeholder="Briefly state your experience, warranty, or spare parts included..."
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            {/* CTAs */}
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
                <Send className="w-3.5 h-3.5" /> Submit Quote
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
