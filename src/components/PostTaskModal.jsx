import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';

export default function PostTaskModal({ isOpen, onClose, onPublishTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electrical');
  const [district, setDistrict] = useState('Alagbaka (GRA & Extension)');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [urgency, setUrgency] = useState('Today (Urgent)');
  const [postedBy, setPostedBy] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !budgetAmount || !postedBy || !description) return;

    const newTask = {
      id: `job-${Date.now()}`,
      title,
      category,
      categoryName: CATEGORIES.find(c => c.id === category)?.name || 'General Task',
      district,
      budgetType: 'Fixed Budget',
      budgetAmount: parseInt(budgetAmount, 10) || 10000,
      urgency,
      postedBy,
      timeAgo: 'Just now',
      status: 'Open for Quotes',
      offersCount: 0,
      description
    };

    onPublishTask(newTask);
    onClose();
    setTitle('');
    setBudgetAmount('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl overflow-hidden shadow-xl animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 flex items-center justify-center font-semibold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Post a Task in Akure</h3>
              <p className="text-xs text-slate-500 font-normal">Describe what you need fixed to receive quotes from local artisans.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
          
          {/* Your Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mrs. Funke Adebayo"
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Generator Repair near Ijapo Estate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Akure Area *</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
              >
                {AKURE_DISTRICTS.filter(d => d !== 'All Akure Areas').map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Budget (₦) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 15000"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Timeline *</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
              >
                <option value="Today (Urgent)">Today (Urgent)</option>
                <option value="Within 2 Days">Within 2 Days</option>
                <option value="Within 1 Week">Within 1 Week</option>
                <option value="Flexible Timeline">Flexible Timeline</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description *</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the issue or repair required in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          {/* Form CTAs */}
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
              className="px-5 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Publish Task
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
