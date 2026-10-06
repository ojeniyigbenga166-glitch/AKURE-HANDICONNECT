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
import { supabase } from './lib/supabase';

function AppContent() {
  const [artisans, setArtisans] = useState(INITIAL_ARTISANS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronously restore authentication state from localStorage to prevent refresh redirects
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('handiconnect_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isRegisteredArtisan, setIsRegisteredArtisan] = useState(() => {
    try {
      const saved = localStorage.getItem('handiconnect_user');
      if (saved) {
        const u = JSON.parse(saved);
        return u.role === 'artisan';
      }
      return false;
    } catch (e) {
      return false;
    }
  });

  const [isAuthSelectionOpen, setIsAuthSelectionOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup-client' | 'signup-artisan'

  const navigate = useNavigate();

  // Load real artisans, tasks & active Supabase Auth session on startup + Realtime & Auto-Sync
  useEffect(() => {
    async function loadInitialData() {
      const dbArtisans = await fetchArtisansFromSupabase();
      if (dbArtisans && Array.isArray(dbArtisans) && dbArtisans.length > 0) {
        setArtisans(dbArtisans);
      }

      const dbTasks = await fetchTasksFromSupabase();
      if (dbTasks && Array.isArray(dbTasks)) {
        setJobs(dbTasks);
      }

      const activeUser = await getCurrentSession();
      if (activeUser) {
        setCurrentUser(activeUser);
        if (activeUser.role === 'artisan') {
          setIsRegisteredArtisan(true);
        }
        try {
          localStorage.setItem('handiconnect_user', JSON.stringify(activeUser));
        } catch (e) {}
      }
    }

    loadInitialData();

    // 1. Background Auto-Sync every 6 seconds to ensure all users receive newly posted tasks
    const syncInterval = setInterval(async () => {
      const freshTasks = await fetchTasksFromSupabase();
      if (freshTasks && Array.isArray(freshTasks)) {
        setJobs(freshTasks);
      }
    }, 6000);

    // 2. Supabase Realtime channel subscription for instant broadcast
    let channel;
    try {
      channel = supabase
        .channel('public-tasks-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'tasks' },
          async () => {
            const updatedTasks = await fetchTasksFromSupabase();
            if (updatedTasks && Array.isArray(updatedTasks)) {
              setJobs(updatedTasks);
            }
          }
        )
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel notice:', e);
    }

    return () => {
      clearInterval(syncInterval);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
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
    const artisanUser = {
      name: newArtisan.name,
      businessName: newArtisan.businessName,
      role: 'artisan',
      phone: newArtisan.phone
    };
    setArtisans([newArtisan, ...artisans]);
    setIsRegisteredArtisan(true);
    setCurrentUser(artisanUser);
    try {
      localStorage.setItem('handiconnect_user', JSON.stringify(artisanUser));
    } catch (e) {}

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
    const authenticatedUser = {
      ...user,
      role: role || user.role || 'client'
    };
    setCurrentUser(authenticatedUser);
    setIsRegisteredArtisan(role === 'artisan' || authenticatedUser.role === 'artisan');

    try {
      localStorage.setItem('handiconnect_user', JSON.stringify(authenticatedUser));
    } catch (e) {}

    if (role === 'artisan' || authenticatedUser.role === 'artisan') {
      const newArtisanObj = {
        id: authenticatedUser.id || 'art-' + Date.now(),
        name: authenticatedUser.name,
        businessName: authenticatedUser.businessName || authenticatedUser.name,
        category: authenticatedUser.category || 'electrical',
        categoryName: 'Electrical & Inverter Systems',
        rating: 5.0,
        reviewsCount: 0,
        completedJobs: 0,
        badge: 'Verified Pro',
        isVerified: true,
        experienceYears: authenticatedUser.experienceYears || 5,
        startingRate: authenticatedUser.startingRate || 5000,
        phone: authenticatedUser.phone || '+2348031234567',
        whatsapp: (authenticatedUser.phone || '2348031234567').replace('+', ''),
        districts: ['Alagbaka (GRA & Extension)', 'Ijapo Estate'],
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
        bio: `Certified ${authenticatedUser.category || 'handyman'} artisan serving Akure.`
      };
      setArtisans(prev => [newArtisanObj, ...prev.filter(a => a.id !== newArtisanObj.id)]);
      showToast(`Welcome ${authenticatedUser.name}! Registered as an Artisan Pro on HandiConnect.`);
    } else {
      showToast(`Welcome back ${authenticatedUser.name}! Signed in to Client Dashboard.`);
    }

    // Immediately navigate user directly to their dashboard according to role!
    navigate('/dashboard');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setIsRegisteredArtisan(false);
    try {
      localStorage.removeItem('handiconnect_user');
    } catch (e) {}
    showToast('Signed out successfully.');
    navigate('/');
  };

  const handleUpdateArtisanProfile = (updatedArtisan) => {
    const updatedUser = {
      ...currentUser,
      name: updatedArtisan.name,
      businessName: updatedArtisan.businessName,
      phone: updatedArtisan.phone,
      district: updatedArtisan.district || (updatedArtisan.districts && updatedArtisan.districts[0]) || currentUser?.district,
      category: updatedArtisan.category
    };
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('handiconnect_user', JSON.stringify(updatedUser));
    } catch (e) {}

    setArtisans(prev => {
      const exists = prev.some(a => a.id === updatedArtisan.id);
      if (exists) {
        return prev.map(a => (a.id === updatedArtisan.id ? { ...a, ...updatedArtisan } : a));
      }
      return [updatedArtisan, ...prev];
    });

    showToast(`Profile settings for ${updatedArtisan.businessName || updatedArtisan.name} saved!`);
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
              onUpdateArtisanProfile={handleUpdateArtisanProfile}
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
