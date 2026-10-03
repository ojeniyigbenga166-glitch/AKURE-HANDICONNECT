import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArtisansDirectory from '../components/ArtisansDirectory';
import PostTaskModal from '../components/PostTaskModal';
import BecomeTaskerModal from '../components/BecomeTaskerModal';
import ArtisanDetailModal from '../components/ArtisanDetailModal';

export default function ArtisansPage({
  artisans,
  onPublishTask,
  onRegisterArtisan
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isBecomeTaskerOpen, setIsBecomeTaskerOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegisterFlow = (newArtisan) => {
    onRegisterArtisan(newArtisan);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full">
      <Navbar
        onOpenPostJob={() => setIsPostTaskOpen(true)}
        onOpenBecomePro={() => setIsBecomeTaskerOpen(true)}
      />

      <main className="flex-grow">
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
        onRegisterArtisan={handleRegisterFlow}
      />

      <ArtisanDetailModal
        isOpen={!!selectedArtisan}
        onClose={() => setSelectedArtisan(null)}
        artisan={selectedArtisan}
      />
    </div>
  );
}
