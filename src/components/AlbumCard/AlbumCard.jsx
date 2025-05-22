import './AlbumCard.css';
const DEFAULT_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

export default function AlbumCard({ album }) {
  if (!album) return null;

  const handleClick = () => {
    if (album.url) {
      window.open(album.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="album-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="album-image-container">
        <img 
          src={album.imageUrl} 
          alt={album.name}
          className="album-image"
          onError={(e) => e.target.src = DEFAULT_IMAGE}
        />
        <div className="album-info">
          <p className="album-title">{album.name}</p>
          <p className="album-artist">{album.artist}</p>
        </div>
      </div>
    </div>
  );
}