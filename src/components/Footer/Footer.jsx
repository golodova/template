import React from 'react';

/**
 * Компонент подвала сайта
 */
export default function Footer() {
  const footerLinks = {
    company: [
      { text: 'About Last.fm', url: 'https://www.last.fm/about' },
      { text: 'Contact Us', url: 'https://www.last.fm/about/contact' },
      { text: 'Jobs', url: 'https://www.last.fm/about/jobs' }
    ],
    help: [
      { text: 'Track My music', url: 'https://www.last.fm/about/trackmymusic' },
      { text: 'Community Support', url: 'https://support.last.fm/' },
      { text: 'Help', url: 'https://cbsi.my.salesforce-sites.com/lastfm/knowledgehome_lfm' }
    ],
    goodies: [
      { text: 'Download Scrobbler', url: 'https://www.last.fm/about/trackmymusic' },
      { text: 'Developer API', url: 'https://www.last.fm/api' },
      { text: 'Free Music Downloads', url: 'https://www.last.fm/music/+free-music-downloads' }
    ],
    account: [
      { text: 'Inbox', url: 'https://www.last.fm/inbox' },
      { text: 'Settings', url: 'https://www.last.fm/settings' }
    ],
    follow: [
      { text: 'Facebook', url: 'https://www.facebook.com/lastfm' },
      { text: 'Twitter', url: 'https://twitter.com/lastfm' },
      { text: 'Instagram', url: 'https://www.instagram.com/last_fm' }
    ]
  };

  return (
    <footer className="bottom-footer">
      <div className="footer-columns">
        {Object.entries(footerLinks).map(([key, links]) => (
          <div key={key} className="footer-column">
            <p className="column-title">{key.toUpperCase()}</p>
            {links.map(link => (
              <a key={link.text} href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}