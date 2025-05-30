import { useEffect, useState } from 'react';
import { lastFmApi } from '../../services/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import TrackItem from '../../components/TrackItem/TrackItem';
import './HomePage.css';

export default function HomePage() {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const [artistsData, tracksData] = await Promise.all([
        lastFmApi.getTopArtists(12),
        lastFmApi.getTopTracks(12)
      ]);
      
      console.log('Artists data:', artistsData); // Для отладки
      console.log('Tracks data:', tracksData);   // Для отладки
      
      setArtists(artistsData);
      setTracks(tracksData);
    } catch (error) {
      console.error('HomePage data loading error:', error);
    }
  };
  
  loadData();
}, []);

  return (
  <div className="home-page">
    <Header />
    <div className="main-content">
        <section className="hot-section">
          <h2 className="section-title">Hot right now</h2>
          <div className="red-line"></div>
          <div className="artists-grid">
            {artists.map(artist => (
              <ArtistCard key={artist.mbid} artist={artist} />
            ))}
          </div>
        </section>

        <section className="tracks-section">
          <h2 className="section-title">Popular tracks</h2>
          <div className="red-line"></div>
          <div className="tracks-grid">
            {tracks.map(track => (
              <TrackItem key={track.mbid} track={track} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}