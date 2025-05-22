import './TrackItem.css';
const DEFAULT_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

export default function TrackItem({ track }) {
  if (!track) return null;

  const handleClick = () => {
    if (track.url) {
      window.open(track.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="track-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img 
        src={track.imageUrl || DEFAULT_IMAGE} 
        alt={track.name}
        className="track-thumbnail"
        onError={(e) => e.target.src = DEFAULT_IMAGE}
      />
      <div className="track-info">
        <p className="track-title">{track.name}</p>
        <p className="track-artist">{track.artist?.name || track.artist || 'Unknown Artist'}</p>
      </div>
    </div>
  );
}