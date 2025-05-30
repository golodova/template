import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { lastFmApi } from '../../services/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import TrackItem from '../../components/TrackItem/TrackItem';
import './SearchPage.css';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('artists');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await lastFmApi.search(query);
      console.log('API Data:', data);
      
      if (data.artists.length > 0 || data.albums.length > 0 || data.tracks.length > 0) {
        setResults(data);
        navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      } else {
        setError('No results found for "' + query + '"');
        setResults(null);
      }
    } catch (err) {
      setError('Search error: ' + err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery);
      handleSearch({ preventDefault: () => {} });
    }
  }, [location.search]);

  const formatDuration = (milliseconds) => {
    if (!milliseconds) return '--:--';
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderResults = () => {
    if (!results) return null;

    switch (activeTab) {
      case 'artists':
        return (
          <section className="results-section">
            <h2>Artists</h2>
            {results.artists.length > 0 ? (
              <div className="artists-grid">
                {results.artists.map(artist => (
                  <ArtistCard 
                    key={artist.mbid || artist.name} 
                    artist={artist} 
                    squareLayout 
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">No artists found</div>
            )}
          </section>
        );
      
      case 'albums':
        return (
          <section className="results-section">
            <h2>Albums</h2>
            {results.albums.length > 0 ? (
              <div className="albums-grid">
                {results.albums.map(album => (
                  <AlbumCard 
                    key={album.mbid || `${album.name}-${album.artist}`} 
                    album={album} 
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">No albums found</div>
            )}
          </section>
        );
      
      case 'tracks':
// В функции renderResults, в case 'tracks':
return (
  <section className="results-section">
    <h2>Tracks</h2>
    {results.tracks.length > 0 ? (
      <div className="tracks-list">
        {results.tracks.map(track => (
          <TrackItem
            key={track.mbid || `${track.name}-${track.artist}`}
            track={{ 
              ...track, 
              durationFormatted: formatDuration(track.duration) 
            }}
            variant="search"
          />
        ))}
      </div>
    ) : (
      <div className="no-results">No tracks found</div>
    )}
  </section>
);
      
      default:
        return null;
    }
  };

  return (
    <div className="search-page">
      <Header />
      <div className="main-content">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for artists, albums, tracks..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button" 
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {loading && <div className="loading-spinner"></div>}
        {error && <div className="error-message">{error}</div>}

        {results && (
          <div className="search-results">
            <h1 className="search-query">
              Results for "<span>{query}</span>"
            </h1>

            <nav className="results-nav">
              {['artists', 'albums', 'tracks'].map((tab) => (
                <button
                  key={tab}
                  className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="gray-line"></div>

            {renderResults()}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}