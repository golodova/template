import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <div className="header-content">
        <div className="player-icons">
          <span className="player-icon">▶</span>
          <span className="player-icon">⏸</span>
          <span className="player-icon">⏹</span>
        </div>
        <div className="logo">last.fm</div>
        <nav className="main-nav">
          <span 
            className="nav-icon"
            onClick={() => navigate('/search')}
          >
            🔍
          </span>
          <a href="/" className="nav-link">Home</a>
          <a href="https://www.last.fm/music" className="nav-link">Music</a>
        </nav>
      </div>
    </header>
  );
}