import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskBoard from '../components/TaskBoard';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import MakeOfferModal from '../components/MakeOfferModal';

export default function TasksPage({
  jobs,
  isRegisteredArtisan,
  currentUser,
  onPublishTask,
  onRegisterArtisan,
  onSubmitOffer,
  onOpenAuthSelection,
  onSignOut
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobForOffer, setSelectedJobForOffer] = useState(null);

  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
      <Navbar
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
        currentUser={currentUser}
        onOpenAuthSelection={onOpenAuthSelection}
        onSignOut={onSignOut}
      />

      <main className="flex-grow">
        {isRegisteredArtisan ? (
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
        ) : (
          <div className="py-20 max-w-3xl mx-auto px-4 text-center space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0F766E] flex items-center justify-center mx-auto border border-emerald-200 font-bold text-2xl">
                🔒
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Live Posted Tasks in Akure
              </h1>
              <p className="text-slate-600 text-sm max-w-md mx-auto font-normal leading-relaxed">
                The live job board is exclusively available for registered artisans. Join 500+ electricians, plumbers, generator mechanics, and builders in Akure to view client requests and submit quotes directly!
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setIsBecomeTaskerOpen(true)}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
                >
                  Register as an Artisan Free
                </button>
              </div>
            </div>
          </div>
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
    </div>
  );
}
