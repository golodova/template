import './ArtistCard.css';
//const DEFAULT_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
const DEFAULT_IMAGE ='../../assets/images/default_image.png';

export default function ArtistCard({ artist }) {
  if (!artist) return null;
  
  const handleClick = () => {
    if (artist.url) {
      window.open(artist.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="artist-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="artist-circle-container">
        <img 
          src={artist.imageUrl || DEFAULT_IMAGE} 
          alt={artist.name}
          className="artist-circle"
          onError={(e) => e.target.src = DEFAULT_IMAGE}
        />
      </div>
      <p className="artist-name">{artist.name}</p>
      {artist.listeners && (
        <p className="artist-listeners">
          {artist.listeners.toLocaleString()} listeners
        </p>
      )}
    </div>
  );
}