import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MusicPage from './pages/MusicPage/MusicPage';
import './styles/main.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      <Route path="/music" element={<MusicPage />} />
      </Routes>
    </Router>
  );
}