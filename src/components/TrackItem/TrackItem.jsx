import { useState } from 'react';
import './TrackItem.css';

const DEFAULT_IMAGE = '../../assets/images/default_image.png';

export default function TrackItem({ track, variant = 'default' }) {
  const [isLiked, setIsLiked] = useState(false);

  if (!track) return null;

  const handleTrackClick = () => {
    if (track.url) {
      window.open(track.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    // Здесь можно добавить логику воспроизведения
    console.log('Play track:', track.name);
  };

  return (
    <div 
      className={`track-item ${variant}`} 
      onClick={handleTrackClick}
      style={{ cursor: 'pointer' }}
    >
      {variant === 'search' && (
         <span className="player1-icon play1-icon"></span>
      )}
      
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
      
      {variant === 'search' && (
        <>
         <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
          />
          <span className="track-duration">{track.durationFormatted || '--:--'}</span>
        </>
      )}
    </div>
  );
}