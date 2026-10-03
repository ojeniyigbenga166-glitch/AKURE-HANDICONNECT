import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import TasksPage from './pages/TasksPage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';

import { INITIAL_ARTISANS, INITIAL_JOBS } from './data/mockData';
import { fetchArtisansFromSupabase } from './services/artisanService';

export default function App() {
  const [artisans, setArtisans] = useState(INITIAL_ARTISANS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isRegisteredArtisan, setIsRegisteredArtisan] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // SECTION 2: Load real artisans from Supabase Cloud Database on startup
  useEffect(() => {
    async function loadSupabaseArtisans() {
      const data = await fetchArtisansFromSupabase();
      if (data && data.length > 0) {
        setArtisans(data);
      }
    }
    loadSupabaseArtisans();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePublishTask = (newTask) => {
    setJobs([newTask, ...jobs]);
    showToast(`Task "${newTask.title}" published successfully! Local artisans have been notified.`);
  };

  const handleRegisterArtisan = (newArtisan) => {
    setArtisans([newArtisan, ...artisans]);
    setIsRegisteredArtisan(true);
    showToast(`Welcome ${newArtisan.name}! Your professional profile is live. You can now view and submit quotes on live tasks.`);
  };

  const handleSubmitOffer = (jobId, offerData) => {
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, offersCount: j.offersCount + 1 };
      }
      return j;
    }));
    showToast(`Your quote for ₦${offerData.offerPrice.toLocaleString()} was sent to the client.`);
  };

  return (
    <BrowserRouter>
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
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
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
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
            />
          }
        />
        <Route
          path="/artisans"
          element={
            <ArtisansPage
              artisans={artisans}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
            />
          }
        />
        <Route
          path="/artisan/:id"
          element={
            <ArtisanProfilePage
              artisans={artisans}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksPage
              jobs={jobs}
              isRegisteredArtisan={isRegisteredArtisan}
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
              onSubmitOffer={handleSubmitOffer}
            />
          }
        />
        <Route
          path="/services"
          element={
            <ServicesPage
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
            />
          }
        />
        <Route
          path="/how-it-works"
          element={
            <HowItWorksPage
              onPublishTask={handlePublishTask}
              onRegisterArtisan={handleRegisterArtisan}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
