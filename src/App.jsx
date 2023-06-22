import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import DetailPodcastPage from './page/DetailPodcastPage';
import EpisodePodcastPage from './page/EpisodePodcastPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/podcast/:podcastId" element={<DetailPodcastPage />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodePodcastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
