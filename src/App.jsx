import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import TasksPage from './pages/TasksPage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';

import AuthSelectionModal from './components/AuthSelectionModal';
import AuthModal from './components/AuthModal';

import { INITIAL_ARTISANS, INITIAL_JOBS } from './data/mockData';
import { fetchArtisansFromSupabase } from './services/artisanService';
import { getCurrentSession, signOutUser } from './services/authService';
import { fetchTasksFromSupabase, publishTaskToSupabase, submitQuoteToSupabase } from './services/taskService';

function AppContent() {
  const [artisans, setArtisans] = useState(INITIAL_ARTISANS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isRegisteredArtisan, setIsRegisteredArtisan] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthSelectionOpen, setIsAuthSelectionOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup-client' | 'signup-artisan'

  const navigate = useNavigate();

  // Load real artisans, tasks & active Supabase Auth session on startup
  useEffect(() => {
    async function loadInitialData() {
      const dbArtisans = await fetchArtisansFromSupabase();
      if (dbArtisans && dbArtisans.length > 0) {
        setArtisans(dbArtisans);
      }

      const dbTasks = await fetchTasksFromSupabase();
      if (dbTasks && dbTasks.length > 0) {
        setJobs(dbTasks);
      }

      const activeUser = await getCurrentSession();
      if (activeUser) {
        setCurrentUser(activeUser);
        if (activeUser.role === 'artisan') {
          setIsRegisteredArtisan(true);
        }
      }
    }
    loadInitialData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePublishTask = async (newTask) => {
    // 1. Optimistic UI Update
    setJobs([newTask, ...jobs]);
    showToast(`Task "${newTask.title}" published! Saving to Supabase...`);

    // 2. Persist directly in Supabase Cloud Database
    const res = await publishTaskToSupabase(newTask);
    if (res.success && res.task) {
      setJobs(prevJobs => prevJobs.map(j => (j.id === newTask.id ? res.task : j)));
      showToast(`Task "${res.task.title}" saved live in Supabase Cloud Database!`);
    }
  };

  const handleRegisterArtisan = (newArtisan) => {
    setArtisans([newArtisan, ...artisans]);
    setIsRegisteredArtisan(true);
    setCurrentUser({
      name: newArtisan.name,
      businessName: newArtisan.businessName,
      role: 'artisan',
      phone: newArtisan.phone
    });
    showToast(`Welcome ${newArtisan.name}! Your professional profile is live.`);
    navigate('/dashboard');
  };

  const handleSubmitOffer = async (jobId, offerData) => {
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, offersCount: (j.offersCount || 0) + 1 };
      }
      return j;
    }));
    showToast(`Your quote for ₦${(offerData.offerPrice || offerData.price || 5000).toLocaleString()} was sent to the client.`);
    await submitQuoteToSupabase({ jobId, ...offerData });
  };

  // Auth Handlers
  const handleSelectClientPath = () => {
    setIsAuthSelectionOpen(false);
    setAuthModalMode('signup-client');
    setIsAuthModalOpen(true);
  };

  const handleSelectArtisanPath = () => {
    setIsAuthSelectionOpen(false);
    setAuthModalMode('signup-artisan');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignIn = () => {
    setIsAuthSelectionOpen(false);
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleAuthenticate = ({ user, role }) => {
    setCurrentUser(user);
    setIsRegisteredArtisan(role === 'artisan');

    if (role === 'artisan') {
      const newArtisanObj = {
        id: 'art-' + Date.now(),
        name: user.name,
        businessName: user.businessName || user.name,
        category: user.category || 'electrical',
        categoryName: 'Electrical & Inverter Systems',
        rating: 5.0,
        reviewsCount: 0,
        completedJobs: 0,
        badge: 'Verified Pro',
        isVerified: true,
        experienceYears: user.experienceYears || 5,
        startingRate: user.startingRate || 5000,
        phone: user.phone || '+2348031234567',
        whatsapp: user.phone?.replace('+', '') || '2348031234567',
        districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate'],
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
        bio: `Certified ${user.category || 'handyman'} artisan serving Akure.`
      };
      setArtisans([newArtisanObj, ...artisans]);
      showToast(`Welcome ${user.name}! Registered as an Artisan Pro on HandiConnect.`);
    } else {
      showToast(`Welcome back ${user.name}! Signed in to Client Dashboard.`);
    }

    // Immediately navigate user directly to their dashboard according to role!
    navigate('/dashboard');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setIsRegisteredArtisan(false);
    showToast('Signed out successfully.');
    navigate('/');
  };

  return (
    <>
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0F766E] text-white px-4 py-3 rounded-lg shadow-lg border border-emerald-600 flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2">
          <span>✓ {toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 font-bold opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              artisans={artisans}
              jobs={jobs}
              isRegisteredArtisan={isRegisteredArtisan}
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              artisans={artisans}
              jobs={jobs}
              isRegisteredArtisan={isRegisteredArtisan}
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onSubmitOffer={handleSubmitOffer}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/artisans"
          element={
            <ArtisansPage
              artisans={artisans}
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/artisan/:id"
          element={
            <ArtisanProfilePage
              artisans={artisans}
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksPage
              jobs={jobs}
              isRegisteredArtisan={isRegisteredArtisan}
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onSubmitOffer={handleSubmitOffer}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/services"
          element={
            <ServicesPage
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/how-it-works"
          element={
            <HowItWorksPage
              currentUser={currentUser}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onOpenAuthSelection={() => setIsAuthSelectionOpen(true)}
              onSignOut={handleSignOut}
            />
          }
        />
      </Routes>

      {/* Global Auth Modals */}
      <AuthSelectionModal
        isOpen={isAuthSelectionOpen}
        onClose={() => setIsAuthSelectionOpen(false)}
        onSelectClientPath={handleSelectClientPath}
        onSelectArtisanPath={handleSelectArtisanPath}
        onOpenSignIn={handleOpenSignIn}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthenticate={handleAuthenticate}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
