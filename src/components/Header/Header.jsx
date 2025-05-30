import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <div className="header-content">
         <div className="player-icons">
          <span className="player-icon play-icon"></span>
          <span className="player-icon pause-icon"></span>
          <span className="player-icon stop-icon"></span>
        </div>
        <div className="logo">last.fm</div>
        <nav className="main-nav">
          <span 
            className="nav-icon search-icon"
            onClick={() => navigate('/search')}
          ></span>
          <a href="/" className="nav-link">Home</a>
         <span className="nav-link" onClick={() => navigate('/music')}>Music</span>
     </nav>
      </div>
    </header>
  );
}