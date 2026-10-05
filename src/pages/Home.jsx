import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TopCategoriesSection from '../components/TopCategoriesSection';
import ArtisansDirectory from '../components/ArtisansDirectory';
import ValueShowcase from '../components/ValueShowcase';
import HowItWorks from '../components/HowItWorks';
import AkureMapSection from '../components/AkureMapSection';
import Footer from '../components/Footer';

import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import ArtisanDetailModal from '../components/ArtisanDetailModal';

export default function Home({
  artisans,
  jobs,
  isRegisteredArtisan,
  currentUser,
  onPublishTask,
  onRegisterArtisan,
  onOpenAuthSelection,
  onSignOut
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/artisans?search=${encodeURIComponent(query)}`);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    navigate(`/artisans?category=${encodeURIComponent(catId)}`);
  };

  const handleSelectDistrict = (districtName) => {
    setSelectedDistrict(districtName);
    navigate(`/artisans?district=${encodeURIComponent(districtName)}`);
  };

  const handleRegisterArtisanFlow = (newArtisan) => {
    onRegisterArtisan(newArtisan);
    navigate('/dashboard');
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

      {/* Hero Section */}
      <Hero
        onSearch={handleSearch}
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />

      <main className="flex-grow">
        <TopCategoriesSection onSelectCategory={handleSelectCategory} />

        <ArtisansDirectory
          artisans={artisans}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          onSelectArtisan={(artisan) => setSelectedArtisan(artisan)}
          onOpenBecomeTasker={() => setIsBecomeTaskerOpen(true)}
          limit={3}
        />

        <ValueShowcase
          onOpenPostJob={() => setIsPostTaskOpen(true)}
          onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
          onSelectCategory={handleSelectCategory}
        />

        <HowItWorks
          onOpenPostTask={() => setIsPostTaskOpen(true)}
          onOpenBecomeTasker={() => setIsBecomeTaskerOpen(true)}
        />

        <AkureMapSection
          onSelectDistrict={handleSelectDistrict}
          isRegistered={isRegisteredArtisan}
          onOpenRegisterModal={() => setIsBecomeTaskerOpen(true)}
        />
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
        onRegisterArtisan={handleRegisterArtisanFlow}
      />

      <ArtisanDetailModal
        isOpen={!!selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
        artisan={selectedArtisan}
      />
    </div>
  );
}
