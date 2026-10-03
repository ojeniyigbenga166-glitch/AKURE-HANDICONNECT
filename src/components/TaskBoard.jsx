import React, { useState } from 'react';
import { MapPin, Clock, MessageSquare, PlusCircle, Search, ChevronRight } from 'lucide-react';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';

export default function TaskBoard({
  jobs,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDistrict,
  setSelectedDistrict,
  onOpenPostTask,
  onOpenMakeOffer
}) {
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  // Filtering Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || job.district === selectedDistrict;
    const matchesUrgency = urgencyFilter === 'all' || 
      (urgencyFilter === 'urgent' && job.urgency.toLowerCase().includes('urgent'));

    return matchesSearch && matchesCategory && matchesDistrict && matchesUrgency;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Live Posted Tasks in Akure</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0F766E] text-xs font-bold border border-emerald-200">
              {filteredJobs.length} Open
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Browse requests posted by residents in Akure. Submit a quote if you are an available artisan.
          </p>
        </div>

        <button
          onClick={onOpenPostTask}
          className="px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
        >
          <PlusCircle className="w-4 h-4" /> Post a New Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Trade Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Akure Area</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
            >
              {AKURE_DISTRICTS.map((d, i) => (
                <option key={i} value={i === 0 ? 'all' : d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Urgency Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Timeline</label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
            >
              <option value="all">All Timelines</option>
              <option value="urgent">Urgent Today Only</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDistrict('all');
                setUrgencyFilter('all');
              }}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 transition-all"
            >
              Reset Filters
            </button>
          </div>

        </div>
      </div>

      {/* Posted Tasks Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-14 bg-white border border-slate-200 rounded-xl p-8">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No tasks matching your current filters</h3>
          <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
            Try adjusting location or trade filters, or publish the first task in this category.
          </p>
          <button
            onClick={onOpenPostTask}
            className="mt-4 px-4 py-2 rounded-lg bg-[#0F766E] text-white font-semibold text-xs"
          >
            Post Task Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 hover:border-[#0F766E] rounded-xl p-5 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header Row: Budget & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold rounded-md">
                    ₦{job.budgetAmount.toLocaleString()}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                    job.urgency.toLowerCase().includes('urgent')
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-[#0F766E] border border-emerald-200'
                  }`}>
                    {job.urgency}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-2">
                  {job.title}
                </h3>

                {/* Meta details */}
                <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                    <span className="truncate font-medium text-slate-800">{job.district}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Posted {job.timeAgo} by <strong className="text-slate-700 font-semibold">{job.postedBy}</strong></span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="mt-3.5 text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60 font-normal">
                  {job.description}
                </p>
              </div>

              {/* Card Footer: Offers count & CTA */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <MessageSquare className="w-4 h-4 text-[#0F766E]" />
                  <span>{job.offersCount} {job.offersCount === 1 ? 'Offer' : 'Offers'}</span>
                </div>

                <button
                  onClick={() => onOpenMakeOffer(job)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1"
                >
                  <span>Submit Quote</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
