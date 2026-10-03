import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopularServices from '../components/PopularServices';
import TopCategoriesSection from '../components/TopCategoriesSection';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage({ onPublishTask, onRegisterArtisan }) {
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectCategory = (catId) => {
    navigate(`/artisans?category=${catId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
      <Navbar
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
      />

      <main className="flex-grow py-6">
        <PopularServices onSelectService={handleSelectCategory} />
        <TopCategoriesSection onSelectCategory={handleSelectCategory} />
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
