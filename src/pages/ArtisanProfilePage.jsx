import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Wrench,
  Star,
  MapPin,
  CheckCircle2,
  Clock,
  Briefcase,
  PhoneCall,
  Share2,
  ArrowLeft,
  Calendar,
  MessageCircle,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import MakeOfferModal from '../components/MakeOfferModal';

export default function ArtisanProfilePage({ artisans, onRegisterArtisan, onPublishTask }) {
  const { id } = useParams();
  const artisan = artisans.find(a => a.id === id) || artisans[0];

  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileUrl = window.location.href;
  const whatsappShareText = encodeURIComponent(
    `Check out ${artisan.businessName || artisan.name} (${artisan.categoryName}) on Akure HandiConnect:\n${profileUrl}`
  );
  const whatsappShareUrl = `https://wa.me/?text=${whatsappShareText}`;
  const directWhatsappUrl = `https://wa.me/${artisan.whatsapp || '2348000000000'}?text=${encodeURIComponent(
    `Hello ${artisan.name}, I found your profile on Akure HandiConnect. I have a job in Akure for you.`
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
      <Navbar
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
      />

      {/* Main Profile Header */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/artisans"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0F766E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Artisans Directory</span>
          </Link>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                />
                {artisan.isVerified && (
                  <span className="absolute -bottom-2 -right-2 bg-[#0F766E] text-white p-1.5 rounded-full border-2 border-white shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-50 text-[#0F766E] border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {artisan.categoryName}
                  </span>
                  {artisan.badge && (
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {artisan.badge}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {artisan.businessName || artisan.name}
                </h1>

                <p className="text-sm text-slate-600 font-medium">
                  Operated by <span className="font-semibold text-slate-800">{artisan.name}</span> • {artisan.experienceYears} Years Experience in Akure
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    <span className="text-slate-900">{artisan.rating}</span>
                    <span className="text-slate-500 font-normal">({artisan.reviewsCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Briefcase className="w-4 h-4 text-[#0F766E]" />
                    <span>{artisan.completedJobs} Completed Jobs</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-4 h-4 text-[#0F766E]" />
                    <span>Avg. Response {artisan.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons & Share */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${artisan.phone}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Call {artisan.phone}</span>
                </a>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F766E] border border-emerald-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  title="Share Profile on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Bio & Portfolio & Reviews */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About / Bio */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                About Business & Expertise
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                {artisan.bio}
              </p>
              
              <div className="pt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-md border border-slate-200">
                  ⚡ Transparent Pricing
                </span>
                <span className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-md border border-slate-200">
                  🛠️ Emergency Repairs
                </span>
                <span className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-md border border-slate-200">
                  📍 Akure On-site Service
                </span>
              </div>
            </div>

            {/* Work Portfolio Gallery */}
            {artisan.portfolio && artisan.portfolio.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Previous Work Samples in Akure ({artisan.portfolio.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {artisan.portfolio.map((item, idx) => (
                    <div key={idx} className="group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 space-y-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-3">
                        <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Reviews */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Client Reviews & Ratings
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  <span>{artisan.rating} / 5.0</span>
                </div>
              </div>

              {artisan.reviews && artisan.reviews.length > 0 ? (
                <div className="space-y-4">
                  {artisan.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-slate-900">{rev.name}</span>
                          <span className="text-xs text-slate-500 font-normal ml-2">({rev.district})</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>
                      <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No reviews written yet. Be the first to leave a feedback!</p>
              )}
            </div>

          </div>

          {/* Right Column: Pricing & Coverage */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Pricing Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Estimated Service Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">₦{artisan.startingRate.toLocaleString()}</span>
                <span className="text-xs text-slate-500 font-medium">starting / job</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Final pricing depends on materials required and scope after physical inspection or WhatsApp discussion.
              </p>
              
              <div className="pt-2 space-y-2">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Job Request</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? '✓ Profile Link Copied!' : 'Copy Profile Link'}</span>
                </button>
              </div>
            </div>

            {/* Coverage Areas */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F766E]" />
                <span>Akure Service Locations</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {artisan.districts && artisan.districts.map((dist, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    📍 {dist}
                  </span>
                ))}
              </div>
            </div>

            {/* Safety Badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>HandiConnect Verified</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed font-normal">
                This artisan's identity, phone contact, and physical workspace in Akure have been logged for safety.
              </p>
            </div>

          </div>

        </div>

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
    </div>
  );
}
