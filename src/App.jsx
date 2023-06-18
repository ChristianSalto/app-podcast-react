import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import DetailPodcastPage from './page/DetailPodcastPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/podcast/:podcastId" element={<DetailPodcastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
