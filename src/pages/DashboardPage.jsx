import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wrench,
  PlusCircle,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  PhoneCall,
  MessageCircle,
  Bookmark,
  Briefcase,
  AlertTriangle,
  UserCheck,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskBoard from '../components/TaskBoard';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import MakeOfferModal from '../components/MakeOfferModal';
import ArtisanDetailModal from '../components/ArtisanDetailModal';

export default function DashboardPage({
  artisans,
  jobs,
  isRegisteredArtisan,
  onPublishTask,
  onRegisterArtisan,
  onSubmitOffer
}) {
  // Mode toggle: if artisan is registered, default to 'artisan-pro', otherwise 'client'
  const [viewMode, setViewMode] = useState(isRegisteredArtisan ? 'artisan-pro' : 'client');
  const [activeDashboardTab, setActiveDashboardTab] = useState(isRegisteredArtisan ? 'live-tasks' : 'my-tasks');
  
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [selectedJobForOffer, setSelectedJobForOffer] = useState(null);

  const [expandedTaskQuotes, setExpandedTaskQuotes] = useState({ 'job-1': true });
  const [hiredJobState, setHiredJobState] = useState({});

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Mock data
  const registeredArtisanInfo = artisans[0]; // Gbenga / Newly registered artisan
  const savedArtisans = artisans.slice(0, 3);

  // Client's posted tasks with detailed sample quotes
  const clientPostedTasks = [
    {
      id: 'job-1',
      title: 'Automatic Changeover Panel & Generator Inverter Wiring',
      category: 'Electrical & Wiring',
      district: 'Alagbaka (GRA & Extension)',
      budgetMin: 15000,
      budgetMax: 25000,
      description: 'Need a certified electrical engineer to wire an automatic changeover switch for a 7.5kVA generator and connect the 3.5kVA Solar Inverter battery bank.',
      postedTime: '2 hours ago',
      status: 'Receiving Quotes',
      quotes: [
        {
          artisanId: 'art-1',
          artisanName: 'Engr. Gbenga Adebayo',
          businessName: 'Gbenga Tech & Electricals',
          rating: 4.9,
          reviewsCount: 56,
          price: 18000,
          eta: '20 mins (Alagbaka)',
          note: 'I am currently working near GRA extension. I can arrive within 20 mins with all required PPR breakers and 10mm copper cables.',
          phone: '+2348031234567',
          whatsapp: '2348031234567',
          avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
        },
        {
          artisanId: 'art-2',
          artisanName: 'Sunday "Sumec" Ojo',
          businessName: 'Ojo Generator Specialist',
          rating: 4.8,
          reviewsCount: 43,
          price: 15000,
          eta: '35 mins (Fanibi)',
          note: 'Experienced with automatic changeover switches for Firman/Lutian generators. Can come down right after my current job in Fanibi.',
          phone: '+2348059876543',
          whatsapp: '2348059876543',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
        }
      ]
    },
    {
      id: 'job-2',
      title: 'Deep Chemical AC Coil Cleaning & Gas Top-up',
      category: 'AC & Refrigeration',
      district: 'Ijapo Estate',
      budgetMin: 8000,
      budgetMax: 15000,
      description: 'Servicing 2 split unit ACs at Ijapo Estate. Needs chemical foam jet wash and R410 gas pressure check.',
      postedTime: '1 day ago',
      status: 'Receiving Quotes',
      quotes: [
        {
          artisanId: 'art-3',
          artisanName: 'Kelvin "Cooling" Amadi',
          businessName: 'Arctic Freeze AC & Refrigeration',
          rating: 4.9,
          reviewsCount: 62,
          price: 12000,
          eta: '15 mins (Ijapo)',
          note: 'I am based right here in Ijapo Estate. Chemical wash pump and R410 manifold gauge ready. 100% cooling guarantee.',
          phone: '+2348123456789',
          whatsapp: '2348123456789',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
        }
      ]
    }
  ];

  const toggleTaskQuotes = (taskId) => {
    setExpandedTaskQuotes(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleHireArtisan = (taskId, artisanName) => {
    setHiredJobState(prev => ({
      ...prev,
      [taskId]: artisanName
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
      <Navbar
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
      />

      {/* Main Dashboard Body */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Mode Switcher Banner if registered as artisan */}
        {isRegisteredArtisan && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 px-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>Logged in as <strong>Verified HandiConnect Pro</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs font-semibold">
              <button
                onClick={() => { setViewMode('client'); setActiveDashboardTab('my-tasks'); }}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'client'
                    ? 'bg-[#0F766E] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👤 Client View (My Hire Requests)
              </button>
              <button
                onClick={() => { setViewMode('artisan-pro'); setActiveDashboardTab('live-tasks'); }}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'artisan-pro'
                    ? 'bg-[#0F766E] text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🛠️ Artisan Pro Dashboard
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW MODE A: CLIENT WORKSPACE */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'client' && (
          <>
            {/* Client Header Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Alagbaka GRA, Akure</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Welcome back, Chief Olumide 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl leading-relaxed">
                    Manage your posted job requests, review quotes from verified local artisans, and track active repairs in Akure.
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsPostTaskOpen(true)}
                    className="px-5 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post a New Task</span>
                  </button>

                  <Link
                    to="/artisans"
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <Wrench className="w-4 h-4 text-[#0F766E]" />
                    <span>Browse Artisans Directory</span>
                  </Link>
                </div>

              </div>
            </div>

            {/* Client Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">My Posted Tasks</span>
                  <FileText className="w-4 h-4 text-[#0F766E]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{clientPostedTasks.length}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Receiving quotes in Akure</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Artisan Quotes Received</span>
                  <MessageCircle className="w-4 h-4 text-[#0F766E]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {clientPostedTasks.reduce((acc, t) => acc + t.quotes.length, 0)}
                </p>
                <span className="text-[11px] text-slate-500 font-normal">From verified local pros</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Saved Artisans</span>
                  <Bookmark className="w-4 h-4 text-[#0F766E]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{savedArtisans.length}</p>
                <span className="text-[11px] text-slate-500 font-normal">Quick contact list</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Completed Repairs</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <span className="text-[11px] text-emerald-600 font-medium">100% verified work</span>
              </div>
            </div>

            {/* Client Navigation Tabs */}
            <div className="bg-white border border-slate-200 rounded-xl p-2 mb-6 flex items-center gap-2 overflow-x-auto shadow-xs">
              <button
                onClick={() => setActiveDashboardTab('my-tasks')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'my-tasks'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                📋 Posted Tasks & Artisan Quotes ({clientPostedTasks.length})
              </button>
              <button
                onClick={() => setActiveDashboardTab('active-repairs')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'active-repairs'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                🛠️ Active Hired Repairs
              </button>
              <button
                onClick={() => setActiveDashboardTab('saved-artisans')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'saved-artisans'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                ⭐ Saved Favorites ({savedArtisans.length})
              </button>
              <button
                onClick={() => setActiveDashboardTab('recent-activity')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'recent-activity'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                💬 WhatsApp Chat History
              </button>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CLIENT TAB 1: My Posted Tasks & Interactive Artisan Quotes */}
            {/* ------------------------------------------------------------- */}
            {activeDashboardTab === 'my-tasks' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Your Posted Tasks & Artisan Quotes</h2>
                    <p className="text-xs text-slate-500 font-normal">Click on any task to view quotes submitted by local artisans in Akure.</p>
                  </div>
                  <button
                    onClick={() => setIsPostTaskOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#0F766E] text-white font-bold text-xs shadow-xs hover:bg-[#115E59] cursor-pointer"
                  >
                    + Post New Task
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-6">
                    {clientPostedTasks.map((job) => {
                      const isExpanded = expandedTaskQuotes[job.id];
                      const hiredArtisan = hiredJobState[job.id];

                      return (
                        <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                          
                          {/* Task Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] uppercase font-bold bg-emerald-50 text-[#0F766E] px-2.5 py-0.5 rounded-full border border-emerald-200">
                                  {job.category}
                                </span>
                                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> {job.district}
                                </span>
                                <span className="text-[11px] text-slate-400 font-normal">({job.postedTime})</span>
                              </div>

                              <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                              <p className="text-xs text-slate-600 font-normal leading-relaxed">{job.description}</p>
                            </div>

                            <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg">
                              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Estimated Budget</span>
                              <span className="text-base font-extrabold text-slate-900">
                                ₦{job.budgetMin.toLocaleString()} - ₦{job.budgetMax.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Task Status & Quotes Accordion Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-semibold">
                              {hiredArtisan ? (
                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                                  <Check className="w-3.5 h-3.5" /> Hired {hiredArtisan}
                                </span>
                              ) : (
                                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold">
                                  ⚡ Receiving Artisan Quotes ({job.quotes.length})
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => toggleTaskQuotes(job.id)}
                              className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Quotes' : `View ${job.quotes.length} Quotes`}</span>
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* EXPANDABLE QUOTES LIST */}
                          {isExpanded && (
                            <div className="pt-3 border-t border-slate-100 space-y-4">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Submitted Quotes from Verified Akure Artisans ({job.quotes.length}):
                              </h4>

                              {job.quotes.map((quote) => (
                                <div
                                  key={quote.artisanId}
                                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                                    hiredArtisan === quote.artisanName
                                      ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                      <img
                                        src={quote.avatar}
                                        alt={quote.artisanName}
                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                                      />
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-bold text-sm text-slate-900">{quote.artisanName}</span>
                                          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                                        </div>
                                        <p className="text-xs font-semibold text-[#0F766E]">{quote.businessName}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" /> {quote.rating}
                                          </span>
                                          <span>•</span>
                                          <span>{quote.reviewsCount} reviews</span>
                                          <span>•</span>
                                          <span className="text-emerald-700 font-medium">ETA: {quote.eta}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quote Price Tag */}
                                    <div className="text-right">
                                      <span className="text-[10px] font-semibold text-slate-400 block">Quote Price</span>
                                      <span className="text-lg font-extrabold text-slate-900">₦{quote.price.toLocaleString()}</span>
                                    </div>
                                  </div>

                                  {/* Artisan Note */}
                                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 italic">
                                    "{quote.note}"
                                  </div>

                                  {/* Action Buttons for Quote */}
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={`https://wa.me/${quote.whatsapp}?text=${encodeURIComponent(`Hello ${quote.artisanName}, I saw your quote of ₦${quote.price.toLocaleString()} for my task on Akure HandiConnect.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F766E] border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5"
                                      >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>WhatsApp Chat</span>
                                      </a>

                                      <a
                                        href={`tel:${quote.phone}`}
                                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
                                      >
                                        <PhoneCall className="w-3.5 h-3.5 text-[#0F766E]" />
                                        <span>Call Pro</span>
                                      </a>
                                    </div>

                                    {hiredArtisan === quote.artisanName ? (
                                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-lg">
                                        <Check className="w-4 h-4" /> Artisan Hired
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => handleHireArtisan(job.id, quote.artisanName)}
                                        className="px-4 py-2 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                                      >
                                        Accept & Hire Artisan
                                      </button>
                                    )}
                                  </div>

                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar Guidelines Card */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[#0F766E] font-bold text-sm">
                        <ShieldCheck className="w-5 h-5" />
                        <span>Client Hiring Safety Tips</span>
                      </div>
                      <ul className="text-xs text-emerald-900 space-y-2 leading-relaxed font-normal">
                        <li>• <strong>No Upfront Payments:</strong> Inspect the completed job in Akure before making payment.</li>
                        <li>• <strong>Verified Identification:</strong> All registered pros on HandiConnect are identity-logged.</li>
                        <li>• <strong>Direct Contact:</strong> Call or chat directly via WhatsApp for swift response.</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                      <h3 className="text-sm font-bold text-slate-900">Need Urgent Assistance?</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        If you have a sudden generator breakdown or electrical fault in Alagbaka/Ijapo, contact our local standby desk directly.
                      </p>
                      <a
                        href="tel:0800HANDICONNECT"
                        className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-400" />
                        <span>Call 0800-HANDI-CONNECT</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CLIENT TAB 2: Active Hired Repairs Tracking */}
            {activeDashboardTab === 'active-repairs' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Active Hired Repairs Progress</h2>
                  <p className="text-xs text-slate-500 font-normal">Track ongoing job repairs in Akure from technician arrival to job completion.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold bg-emerald-50 text-[#0F766E] px-2.5 py-0.5 rounded border border-emerald-200">
                        Electrical & Inverter Setup
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">Automatic Changeover & Inverter Battery Installation</h3>
                      <p className="text-xs text-slate-500 font-medium">Assigned Artisan: <strong>Engr. Gbenga Adebayo</strong> • Alagbaka GRA</p>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full self-start sm:self-auto">
                      🛠️ Work in Progress
                    </span>
                  </div>

                  {/* Step Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 text-xs font-semibold">
                    <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-center space-y-1">
                      <span className="block text-emerald-600 font-bold">Step 1</span>
                      <span>Task Posted ✅</span>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-center space-y-1">
                      <span className="block text-emerald-600 font-bold">Step 2</span>
                      <span>Artisan Hired ✅</span>
                    </div>
                    <div className="p-3 bg-[#0F766E] text-white rounded-lg text-center space-y-1 shadow-xs">
                      <span className="block text-emerald-200 font-bold">Step 3</span>
                      <span>On-Site Inspection 🛠️</span>
                    </div>
                    <div className="p-3 bg-slate-200 text-slate-600 rounded-lg text-center space-y-1">
                      <span className="block text-slate-400 font-bold">Step 4</span>
                      <span>Job Completion & Review</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CLIENT TAB 3: Saved Favorite Artisans */}
            {activeDashboardTab === 'saved-artisans' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Your Bookmarked Artisans in Akure</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {savedArtisans.map((artisan) => (
                    <div key={artisan.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={artisan.avatar}
                          alt={artisan.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{artisan.name}</h3>
                          <p className="text-xs font-semibold text-[#0F766E]">{artisan.businessName}</p>
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" /> {artisan.rating} ({artisan.reviewsCount})
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {artisan.bio}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">₦{artisan.startingRate.toLocaleString()} start</span>
                        <Link
                          to={`/artisan/${artisan.id}`}
                          className="px-3 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59]"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLIENT TAB 4: WhatsApp Chat History */}
            {activeDashboardTab === 'recent-activity' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Recent WhatsApp Interactions</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F766E] flex items-center justify-center font-bold text-sm">
                        💬
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">Engr. Gbenga Adebayo</span>
                        <p className="text-slate-500 font-normal">Contacted regarding Inverter setup in Alagbaka</p>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/2348031234567`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[#0F766E] text-white font-bold hover:bg-[#115E59] flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Re-open WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F766E] flex items-center justify-center font-bold text-sm">
                        💬
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">Sunday "Sumec" Ojo</span>
                        <p className="text-slate-500 font-normal">Contacted regarding generator AVR replacement</p>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/2348059876543`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[#0F766E] text-white font-bold hover:bg-[#115E59] flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Re-open WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW MODE B: ARTISAN PRO WORKSPACE */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'artisan-pro' && (
          <>
            {/* Header Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Gold Verified Artisan Pro</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
                      📱 WhatsApp Direct Leads Active
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Welcome back, {registeredArtisanInfo.name} 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl">
                    {registeredArtisanInfo.businessName} • Servicing Alagbaka, Ijapo, FUTA & Akure Metro. View live client tasks and submit instant quotes.
                  </p>
                </div>

                {/* Pro Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={`/artisan/${registeredArtisanInfo.id}`}
                    className="px-4 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Public Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + `/artisan/${registeredArtisanInfo.id}`);
                      alert('Profile URL copied! Share on WhatsApp with clients in Akure.');
                    }}
                    className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    <span>Share on WhatsApp</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Pro Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Live Tasks in Akure</span>
                  <Briefcase className="w-4 h-4 text-[#0F766E]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Ready for quotes</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">My Submitted Quotes</span>
                  <FileText className="w-4 h-4 text-[#0F766E]" />
                </div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <span className="text-[11px] text-slate-500 font-normal">Active client responses</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Pro Rating Score</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{registeredArtisanInfo.rating}</p>
                <span className="text-[11px] text-slate-500 font-normal">From {registeredArtisanInfo.reviewsCount} Akure clients</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Completed Jobs</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{registeredArtisanInfo.completedJobs}</p>
                <span className="text-[11px] text-emerald-600 font-medium">Verified work</span>
              </div>
            </div>

            {/* Pro Tabs */}
            <div className="bg-white border border-slate-200 rounded-xl p-2 mb-6 flex items-center gap-2 overflow-x-auto shadow-xs">
              <button
                onClick={() => setActiveDashboardTab('live-tasks')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'live-tasks'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                ⚡ Live Tasks Board ({jobs.length})
              </button>
              <button
                onClick={() => setActiveDashboardTab('my-profile')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'my-profile'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                👤 My Profile & Services
              </button>
              <button
                onClick={() => setActiveDashboardTab('lead-alerts')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeDashboardTab === 'lead-alerts'
                    ? 'bg-emerald-50 text-[#0F766E] font-bold border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                📱 WhatsApp Lead Log
              </button>
            </div>

            {/* PRO TAB 1: Live Tasks Board */}
            {activeDashboardTab === 'live-tasks' && (
              <TaskBoard
                jobs={jobs}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                onOpenPostTask={() => setIsPostTaskOpen(true)}
                onOpenMakeOffer={(job) => setSelectedJobForOffer(job)}
              />
            )}

            {/* PRO TAB 2: My Profile & Services */}
            {activeDashboardTab === 'my-profile' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Your HandiConnect Artisan Card</h2>
                    <p className="text-xs text-slate-500 font-normal">This is how clients in Akure view your business profile.</p>
                  </div>
                  <Link
                    to={`/artisan/${registeredArtisanInfo.id}`}
                    className="px-4 py-2 rounded-lg bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59]"
                  >
                    Preview Full Profile
                  </Link>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src={registeredArtisanInfo.avatar}
                    alt={registeredArtisanInfo.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="space-y-1">
                    <span className="text-xs bg-emerald-50 text-[#0F766E] px-2.5 py-0.5 rounded font-bold border border-emerald-200">
                      {registeredArtisanInfo.categoryName}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{registeredArtisanInfo.businessName}</h3>
                    <p className="text-xs text-slate-600 font-medium">Owner: {registeredArtisanInfo.name} • {registeredArtisanInfo.experienceYears} Years Exp.</p>
                    <p className="text-xs text-slate-500 pt-1 font-normal">{registeredArtisanInfo.bio}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-1">
                    <span className="font-semibold text-slate-500 block">Registered WhatsApp Line</span>
                    <span className="font-bold text-slate-900 text-sm">{registeredArtisanInfo.phone}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-1">
                    <span className="font-semibold text-slate-500 block">Starting Service Rate</span>
                    <span className="font-bold text-slate-900 text-sm">₦{registeredArtisanInfo.startingRate.toLocaleString()} / job</span>
                  </div>
                </div>
              </div>
            )}

            {/* PRO TAB 3: WhatsApp Lead Log */}
            {activeDashboardTab === 'lead-alerts' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Direct WhatsApp Job Notifications</h2>
                <p className="text-xs text-slate-500">
                  When clients in your Akure coverage areas post a task, alerts are forwarded to your registered WhatsApp line.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F766E]">⚡ New Lead Alert — Alagbaka GRA</span>
                      <span className="text-slate-500 font-normal">10 mins ago</span>
                    </div>
                    <p className="text-slate-800 font-medium">
                      "Client Dr. Femi requires urgent automatic generator changeover panel repair in Alagbaka."
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-slate-500 font-normal">Budget: ₦15,000 - ₦25,000</span>
                      <span className="font-bold text-[#0F766E]">✓ Sent to your WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      <Footer
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
      />

      <PostTaskModal
        isOpen={isPostTaskOpen}
        onClose={() => setIsPostTaskOpen(false)}
        onPublishTask={onPublishTask}
      />

      <BecomeTaskerModal
        isOpen={isBecomeTaskerOpen}
        onClose={() => setIsBecomeTaskerOpen(false)}
        onRegisterArtisan={onRegisterArtisan}
      />

      <MakeOfferModal
        isOpen={!!selectedJobForOffer}
        onClose={() => setSelectedJobForOffer(null)}
        job={selectedJobForOffer}
        onSubmitOffer={onSubmitOffer}
      />

      <ArtisanDetailModal
        isOpen={!!selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
        artisan={selectedArtisan}
      />
    </div>
  );
}
