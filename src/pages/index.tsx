// pages/index.tsx

import { useState, useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import EditBanner from '../components/EditBanner';

interface AdBannerData {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  backgroundImage: string;
}

const Home = () => {
  const [banners, setBanners] = useState<AdBannerData[]>([]);
  const [editBanner, setEditBanner] = useState<AdBannerData | null>(null);

  useEffect(() => {
    // Fetch the banners from the JSON file
    fetch('/ads.json')
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  const handleEdit = (id: number) => {
    const banner = banners.find((b) => b.id === id);
    if (banner) setEditBanner(banner);
  };

  const handleSave = (updatedBanner: AdBannerData) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
  };

  const handleClose = () => {
    setEditBanner(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl flex content-center justify-center text-yellow-400 my-4">Ad Banners</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <AdBanner key={banner.id} {...banner} onEdit={handleEdit} />
        ))}
      </div>
      {editBanner && (
        <EditBanner banner={editBanner} onSave={handleSave} onClose={handleClose} />
      )}
    </div>
  );
};

export default Home;
