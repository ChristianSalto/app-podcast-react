import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './page/HomePage';
import DetailPodcastPage from './page/DetailPodcastPage';
import EpisodePodcastPage from './page/EpisodePodcastPage';
import Footer from './components/shared/Footer/Footer'

export const LoadingContext = createContext(false);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    };

    loadData();
  }, [location]);

  return (
 
      <LoadingContext.Provider value={isLoading}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/podcast/:podcastId" element={<DetailPodcastPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodePodcastPage />} />
        </Routes>
        <Footer />
      </LoadingContext.Provider>

  );
};

export default App;






