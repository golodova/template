
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MusicPage.css';

// Импортируем изображения
import rockImage from '../../assets/images/rock.jpg';
import popImage from '../../assets/images/pop.jpeg';
import hiphopImage from '../../assets/images/hiphop.jpg';
import electronic from '../../assets/images/electronic.jpg';
import jazz from '../../assets/images/jazz.jpg';
import metal from '../../assets/images/metal.jpg';
import indie from '../../assets/images/indie.jpg';
import rnb from '../../assets/images/rnb.jpg';
import classical from '../../assets/images/classical.jpg';
import alternetive from '../../assets/images/alternetive.jpg';
import punk from '../../assets/images/punk.jpg';
import folk from '../../assets/images/folk.jpg';
import country from '../../assets/images/country.jpg';
import blues from '../../assets/images/blues.jpg';
import reggae from '../../assets/images/regae.jpg';
import soul from '../../assets/images/soul.jpg';
import funk from '../../assets/images/funk.jpg';
import disco from '../../assets/images/disco.jpg';
import house from '../../assets/images/house.jpg';
import techno from '../../assets/images/techno.jpg';

const musicTags = [
  { id: 1, name: 'Rock', image: rockImage, url: 'https://www.last.fm/tag/rock' },
  { id: 2, name: 'Pop', image:popImage, url: 'https://www.last.fm/tag/pop' },
  { id: 3, name: 'Hip-Hop', image: hiphopImage, url: 'https://www.last.fm/tag/hip-hop' },
  { id: 4, name: 'Electronic', image: electronic, url: 'https://www.last.fm/tag/electronic' },
  { id: 5, name: 'Jazz', image: jazz, url: 'https://www.last.fm/tag/jazz' },
  { id: 6, name: 'Metal', image: metal, url: 'https://www.last.fm/tag/metal' },
  { id: 7, name: 'Indie', image: indie, url: 'https://www.last.fm/tag/indie' },
  { id: 8, name: 'R&B', image: rnb, url: 'https://www.last.fm/tag/r&b' },
  { id: 9, name: 'Classical', image: classical, url: 'https://www.last.fm/tag/classical' },
  { id: 10, name: 'Alternative', image: alternetive, url: 'https://www.last.fm/tag/alternative' },
  { id: 11, name: 'Punk', image: punk, url: 'https://www.last.fm/tag/punk' },
  { id: 12, name: 'Folk', image: folk, url: 'https://www.last.fm/tag/folk' },
  { id: 13, name: 'Country', image: country, url: 'https://www.last.fm/tag/country' },
  { id: 14, name: 'Blues', image: blues, url: 'https://www.last.fm/tag/blues' },
  { id: 15, name: 'Reggae', image: reggae, url: 'https://www.last.fm/tag/reggae' },
  { id: 16, name: 'Soul', image: soul, url: 'https://www.last.fm/tag/soul' },
  { id: 17, name: 'Funk', image: funk, url: 'https://www.last.fm/tag/funk' },
  { id: 18, name: 'Disco', image: disco, url: 'https://www.last.fm/tag/disco' },
  { id: 19, name: 'House', image: house, url: 'https://www.last.fm/tag/house' },
  { id: 20, name: 'Techno', image: techno, url: 'https://www.last.fm/tag/techno' }
];

export default function MusicPage() {
  const navigate = useNavigate();

  const handleTagClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderTagBlock = (mainTag, sideTags, reverse = false) => {
    return (
      <div className={`tag-block ${reverse ? 'reverse' : ''}`}>
        <div className="main-tag" onClick={() => handleTagClick(mainTag.url)}>
          <img src={mainTag.image} alt={mainTag.name} />
          <div className="tag-overlay">
            <span>{mainTag.name}</span>
          </div>
        </div>
        <div className="side-tags">
          {sideTags.map(tag => (
            <div key={tag.id} className="small-tag" onClick={() => handleTagClick(tag.url)}>
              <img src={tag.image} alt={tag.name} />
              <div className="tag-overlay">
                <span>{tag.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="music-page">
        <Header />
        <div className="music-content">
      <div className="music-header">
        <h1>Music</h1>
        <h2>Overview</h2>
      </div>

      <div className="tags-section">
        <h3>Tags to explore</h3>
        <div className="red-line"></div>
        
        {renderTagBlock(musicTags[0], musicTags.slice(1, 10))}
        {renderTagBlock(musicTags[10], musicTags.slice(11, 20), true)}
      </div>
      </div>
      <Footer />
    </div>
  );
}