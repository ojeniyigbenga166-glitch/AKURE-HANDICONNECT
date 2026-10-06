import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  Edit3,
  Save,
  User,
  Phone,
  DollarSign,
  Award,
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskBoard from '../components/TaskBoard';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import MakeOfferModal from '../components/MakeOfferModal';
import ArtisanDetailModal from '../components/ArtisanDetailModal';
import { AKURE_DISTRICTS, CATEGORIES } from '../data/mockData';
import { updateArtisanProfileInSupabase } from '../services/artisanService';

export default function DashboardPage({
  artisans,
  jobs,
  isRegisteredArtisan,
  currentUser,
  onPublishTask,
  onRegisterArtisan,
  onUpdateArtisanProfile,
  onSubmitOffer,
  onOpenAuthSelection,
  onSignOut
}) {
  const isArtisanRole = currentUser?.role === 'artisan' || isRegisteredArtisan || (artisans || []).some(a => 
    a.id === currentUser?.id || 
    (currentUser?.email && a.email?.toLowerCase() === currentUser.email?.toLowerCase()) || 
    (currentUser?.phone && a.phone === currentUser.phone)
  );
  const [viewMode, setViewMode] = useState(isArtisanRole ? 'artisan-pro' : 'client');
  const [activeDashboardTab, setActiveDashboardTab] = useState(isArtisanRole ? 'live-tasks' : 'my-tasks');

  useEffect(() => {
    const isArtisan = currentUser?.role === 'artisan' || isRegisteredArtisan || (artisans || []).some(a => 
      a.id === currentUser?.id || 
      (currentUser?.email && a.email?.toLowerCase() === currentUser.email?.toLowerCase()) || 
      (currentUser?.phone && a.phone === currentUser.phone)
    );
    setViewMode(isArtisan ? 'artisan-pro' : 'client');
    setActiveDashboardTab(isArtisan ? 'live-tasks' : 'my-tasks');
  }, [currentUser, isRegisteredArtisan, artisans]);

  
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

  // Dynamic artisan info & active tasks
  const registeredArtisanInfo = (artisans || []).find(
    a => a.phone === currentUser?.phone || a.name === currentUser?.name
  ) || artisans[0] || {
    id: currentUser?.id || 'art-user',
    name: currentUser?.name || 'Marvellous Adebayo',
    businessName: currentUser?.businessName || currentUser?.name || 'Adebayo Pro Services',
    category: currentUser?.category || 'electrical',
    categoryName: 'Electrical & Inverter Systems',
    rating: 5.0,
    reviewsCount: 0,
    completedJobs: 0,
    startingRate: 5000,
    phone: currentUser?.phone || '08031234567',
    districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate'],
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    bio: 'Professional artisan servicing Akure with top craftsmanship and quick response.'
  };

  // Profile Settings Form State for Artisan Pro
  const [profileForm, setProfileForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    category: 'electrical',
    experienceYears: 5,
    startingRate: 5000,
    districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate'],
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    services: [
      'Inverter & Battery System Setup',
      'Automatic Generator Changeover Switches',
      'Residential Conduit & Surface Wiring',
      'Fault Diagnostics & Repair'
    ]
  });

  const [newServiceInput, setNewServiceInput] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSavedSuccess, setProfileSavedSuccess] = useState(false);

  useEffect(() => {
    if (registeredArtisanInfo) {
      setProfileForm({
        name: registeredArtisanInfo.name || currentUser?.name || 'Marvellous Adebayo',
        businessName: registeredArtisanInfo.businessName || currentUser?.businessName || 'Adebayo Pro Services',
        phone: registeredArtisanInfo.phone || currentUser?.phone || '08031234567',
        category: registeredArtisanInfo.category || currentUser?.category || 'electrical',
        experienceYears: registeredArtisanInfo.experienceYears || 5,
        startingRate: registeredArtisanInfo.startingRate || 5000,
        districts: registeredArtisanInfo.districts && registeredArtisanInfo.districts.length > 0
          ? registeredArtisanInfo.districts
          : ['Alagbaka (GRA & Extension)', 'Ijapo Estate'],
        bio: registeredArtisanInfo.bio || 'Experienced artisan in Akure dedicated to top quality craftsmanship, safety, and rapid response for homes and businesses.',
        avatar: registeredArtisanInfo.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
        services: registeredArtisanInfo.services || [
          'Inverter & Battery System Setup',
          'Automatic Generator Changeover Switches',
          'Residential Conduit & Surface Wiring',
          'Fault Diagnostics & Repair'
        ]
      });
    }
  }, [currentUser, isRegisteredArtisan]);

  const handleDistrictToggleInProfile = (d) => {
    if (profileForm.districts.includes(d)) {
      if (profileForm.districts.length === 1) return;
      setProfileForm({ ...profileForm, districts: profileForm.districts.filter(item => item !== d) });
    } else {
      setProfileForm({ ...profileForm, districts: [...profileForm.districts, d] });
    }
  };

  const handleAddService = () => {
    if (!newServiceInput.trim()) return;
    setProfileForm({
      ...profileForm,
      services: [...profileForm.services, newServiceInput.trim()]
    });
    setNewServiceInput('');
  };

  const handleRemoveService = (index) => {
    setProfileForm({
      ...profileForm,
      services: profileForm.services.filter((_, i) => i !== index)
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);

    const categoryObj = CATEGORIES.find(c => c.id === profileForm.category);
    const categoryName = categoryObj ? categoryObj.name : 'Skilled Repairs';

    const updatedArtisan = {
      id: registeredArtisanInfo.id || currentUser?.id || 'art-user',
      name: profileForm.name,
      businessName: profileForm.businessName || profileForm.name,
      category: profileForm.category,
      categoryName,
      rating: registeredArtisanInfo.rating || 5.0,
      reviewsCount: registeredArtisanInfo.reviewsCount || 0,
      completedJobs: registeredArtisanInfo.completedJobs || 0,
      badge: registeredArtisanInfo.badge || 'Verified Pro',
      isVerified: true,
      experienceYears: parseInt(profileForm.experienceYears, 10) || 5,
      startingRate: parseInt(profileForm.startingRate, 10) || 5000,
      phone: profileForm.phone,
      whatsapp: profileForm.phone.replace('+', '').replace(/\s+/g, ''),
      districts: profileForm.districts,
      avatar: profileForm.avatar,
      bio: profileForm.bio,
      services: profileForm.services,
      responseTime: registeredArtisanInfo.responseTime || '< 15 minutes'
    };

    if (onUpdateArtisanProfile) {
      onUpdateArtisanProfile(updatedArtisan);
    }
    await updateArtisanProfileInSupabase(updatedArtisan);

    setIsSavingProfile(false);
    setProfileSavedSuccess(true);
    setTimeout(() => setProfileSavedSuccess(false), 4000);
  };


  // If user is not logged in, prompt them to Sign In / Register as Client or Artisan
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
        <Navbar
          onOpenPostJob={() => setIsPostTaskOpen(true)}
          currentUser={null}
          onOpenAuthSelection={onOpenAuthSelection}
          onSignOut={onSignOut}
        />

        <main className="flex-grow flex items-center justify-center p-6 py-16">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-lg space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#0F766E] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <UserCheck className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Access Your Dashboard</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Please sign in or create an account as a <strong>Client</strong> (to manage tasks & quotes) or as an <strong>Artisan</strong> (to view jobs & quote prices).
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={onOpenAuthSelection}
                className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In / Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        <Footer onOpenPostJob={() => setIsPostTaskOpen(true)} />

        <PostTaskModal
          isOpen={isPostTaskOpen}
          onClose={() => setIsPostTaskOpen(false)}
          onPublishTask={onPublishTask}
        />
      </div>
    );
  }

  const savedArtisans = (artisans || []).slice(0, 3);


  // Real active tasks from state / Supabase Cloud Database
  const clientPostedTasks = (jobs || []).map(j => ({
    id: j.id,
    title: j.title,
    category: j.categoryName || j.category || 'General Repair',
    district: j.district,
    budgetMin: j.budgetMin || Math.round((j.budgetAmount || 10000) * 0.8),
    budgetMax: j.budgetMax || j.budgetAmount || 15000,
    description: j.description,
    postedTime: j.timeAgo || 'Recently',
    status: j.status || 'Receiving Quotes',
    quotes: j.quotes || []
  }));

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
        currentUser={currentUser}
        onOpenAuthSelection={onOpenAuthSelection}
        onSignOut={onSignOut}
      />

      {/* Main Dashboard Body */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Mode Switcher Banner if registered as artisan */}
        {isArtisanRole && (
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
                    <span>{currentUser?.district || 'Akure Metro, Ondo State'}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Welcome back, {currentUser?.name || 'Client'} 👋
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
                    Welcome back, {currentUser?.name || registeredArtisanInfo.name} 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl">
                    {currentUser?.businessName || registeredArtisanInfo.businessName} • Servicing {currentUser?.district || 'Alagbaka, Ijapo, FUTA & Akure Metro'}. View live client tasks and submit instant quotes.
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

            {/* PRO TAB 2: My Profile Settings & Showcase */}
            {activeDashboardTab === 'my-profile' && (
              <div className="space-y-6">
                
                {/* Header Banner */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0F766E] border border-emerald-200 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Artisan Pro Profile Settings</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Manage Your Professional Profile & Business Details
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl font-normal leading-relaxed">
                      Set up and edit what potential clients in Akure see when searching for artisans — your business name, contact line, starting rates, trade category, bio, and coverage zones.
                    </p>
                  </div>

                  <Link
                    to={`/artisan/${registeredArtisanInfo.id}`}
                    className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Preview Public Profile Page</span>
                  </Link>
                </div>

                {/* Success Notification Banner */}
                {profileSavedSuccess && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />
                      <span><strong>Profile Saved Live!</strong> Your updated details are now visible to clients in Akure directory.</span>
                    </div>
                    <button onClick={() => setProfileSavedSuccess(false)} className="font-bold text-slate-500 hover:text-slate-800">✕</button>
                  </div>
                )}

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* LEFT COLUMN (5 Cols): Live Profile Preview Card */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 sticky top-24">
                      
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#0F766E]" />
                          <span>Live Public Card Preview</span>
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Active Pro
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={profileForm.avatar}
                            alt={profileForm.name}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500 shadow-xs shrink-0"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold bg-emerald-50 text-[#0F766E] px-2 py-0.5 rounded border border-emerald-200 inline-block">
                              {CATEGORIES.find(c => c.id === profileForm.category)?.name || 'Skilled Pro'}
                            </span>
                            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                              {profileForm.businessName || 'Business Name'}
                            </h3>
                            <p className="text-xs text-slate-600 font-medium">
                              Owner: <strong>{profileForm.name || 'Owner Name'}</strong>
                            </p>
                          </div>
                        </div>

                        {/* Rating & Stats */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <span className="text-[10px] font-medium text-slate-500 block">Rating</span>
                            <span className="font-extrabold text-amber-500 flex items-center justify-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                              {registeredArtisanInfo.rating || 5.0}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-medium text-slate-500 block">Experience</span>
                            <span className="font-extrabold text-slate-900">{profileForm.experienceYears} Years</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-medium text-slate-500 block">Starting Rate</span>
                            <span className="font-extrabold text-[#0F766E]">₦{Number(profileForm.startingRate || 0).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* WhatsApp & Call Buttons Preview */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <a
                            href={`https://wa.me/${(profileForm.phone || '').replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg bg-emerald-50 text-[#0F766E] border border-emerald-200 font-bold text-center flex items-center justify-center gap-1 hover:bg-emerald-100"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${profileForm.phone}`}
                            className="py-2 px-3 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-center flex items-center justify-center gap-1 hover:bg-slate-200"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-[#0F766E]" />
                            <span>Call Pro</span>
                          </a>
                        </div>

                        {/* Akure Coverage Zones Preview */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Operational Zones:</span>
                          <div className="flex flex-wrap gap-1">
                            {profileForm.districts.map((d, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                                📍 {d.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bio Overview Preview */}
                        <div className="border-t border-slate-100 pt-3">
                          <span className="text-[11px] font-bold text-slate-700 block mb-1">About What I Do:</span>
                          <p className="text-xs text-slate-600 font-normal leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                            "{profileForm.bio || 'Your bio overview will appear here for clients in Akure.'}"
                          </p>
                        </div>

                        {/* Services List Preview */}
                        {profileForm.services && profileForm.services.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-slate-700 block">Services Offered:</span>
                            <ul className="space-y-1 text-xs text-slate-700">
                              {profileForm.services.map((svc, i) => (
                                <li key={i} className="flex items-center gap-1.5 font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                                  <span>{svc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>

                  {/* RIGHT COLUMN (7 Cols): Interactive Profile Settings Form */}
                  <div className="lg:col-span-7 space-y-6">
                    <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                      
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-base font-extrabold text-slate-900">Edit Profile & Business Information</h3>
                        <p className="text-xs text-slate-500">Update your details anytime. Changes will save to your live HandiConnect profile.</p>
                      </div>

                      {/* 1. Personal & Business Identity */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>Contact & Business Identity</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Owner / Contact Person Name *</label>
                            <input
                              type="text"
                              required
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              placeholder="e.g. Marvellous Adebayo"
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Artisan / Business Name *</label>
                            <input
                              type="text"
                              required
                              value={profileForm.businessName}
                              onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                              placeholder="e.g. Adebayo Electrical & Tech Pro"
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            WhatsApp & Contact Phone Line (for Direct Job Alerts) *
                          </label>
                          <input
                            type="tel"
                            required
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            placeholder="e.g. 0803 123 4567"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                          />
                        </div>
                      </div>

                      {/* 2. Trade Category & Pricing */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                          <Wrench className="w-4 h-4" />
                          <span>Trade Category & Rates</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-1">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Trade Category *</label>
                            <select
                              value={profileForm.category}
                              onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                            >
                              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Years Experience *</label>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={profileForm.experienceYears}
                              onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Starting Rate (₦) *</label>
                            <input
                              type="number"
                              step="500"
                              value={profileForm.startingRate}
                              onChange={(e) => setProfileForm({ ...profileForm, startingRate: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. Akure Neighborhood Coverage */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>Akure Neighborhood Coverage Zones</span>
                        </h4>

                        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-36 overflow-y-auto">
                          {AKURE_DISTRICTS.filter(d => d !== 'All Akure Areas').map((d, i) => {
                            const isSelected = profileForm.districts.includes(d);
                            return (
                              <button
                                type="button"
                                key={i}
                                onClick={() => handleDistrictToggleInProfile(d)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#0F766E] text-white shadow-xs'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{d}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. Professional Overview ("What I Do") */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          <span>Professional Overview & Business Bio</span>
                        </h4>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Describe Your Expertise & Services (For Clients to Know More What You Do) *
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                            placeholder="Describe your qualifications, equipment, typical repair turnarounds, and why clients in Akure should hire you..."
                            className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E] leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* 5. Specific Services Offered List */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Specific Services & Capabilities</span>
                        </h4>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newServiceInput}
                            onChange={(e) => setNewServiceInput(e.target.value)}
                            placeholder="Add a service (e.g. Solar Panel Wiring, Changeover panel setup)"
                            className="flex-grow bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0F766E]"
                          />
                          <button
                            type="button"
                            onClick={handleAddService}
                            className="px-4 py-2 bg-[#0F766E] text-white font-bold text-xs rounded-xl hover:bg-[#115E59] flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {profileForm.services.map((svc, i) => (
                            <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
                              <span className="font-semibold text-slate-800">✓ {svc}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveService(i)}
                                className="text-rose-500 hover:text-rose-700 font-bold ml-2 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Submit CTA Button */}
                      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                          type="submit"
                          disabled={isSavingProfile}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSavingProfile ? (
                            <span>Saving Profile Settings...</span>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Profile Settings</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>
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
        currentUser={currentUser}
      />

      <ArtisanDetailModal
        isOpen={!!selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
        artisan={selectedArtisan}
      />
    </div>
  );
}
