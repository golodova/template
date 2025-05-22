const API_KEY = 'dc08979bf5f907d92ed624ad7e31df4c';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const DEFAULT_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

// Функция для получения лучшего доступного изображения
function getBestImageUrl(images) {
  if (!Array.isArray(images)) return DEFAULT_IMAGE;
  const sizes = ['extralarge', 'large', 'medium', 'small'];
  for (const size of sizes) {
    const image = images.find(img => img.size === size);
    if (image?.['#text']) {
      return image['#text'].replace('http://', 'https://');
    }
  }
  return DEFAULT_IMAGE;
}

// Универсальная обработка элементов
function processItems(items) {
  if (!items) return [];
  return items.map(item => ({
    ...item,
    imageUrl: item.image ? getBestImageUrl(item.image) : DEFAULT_IMAGE,
    mbid: item.mbid || '',
    url: item.url || generateLastFmUrl(item) // Добавляем URL
  }));
}

// Новая функция для генерации URL
function generateLastFmUrl(item) {
  if (item.mbid) {
    if (item.duration) { // Это трек
      return `https://www.last.fm/music/${encodeURIComponent(item.artist)}/_/${encodeURIComponent(item.name)}`;
    } else if (item.artist) { // Это альбом
      return `https://www.last.fm/music/${encodeURIComponent(item.artist)}/${encodeURIComponent(item.name)}`;
    } else { // Это артист
      return `https://www.last.fm/music/${encodeURIComponent(item.name)}`;
    }
  }
  return null;
}

export const lastFmApi = {
  // Поиск по всем категориям
  async search(query, limit = 8) {
    try {
      const [artistsRes, albumsRes, tracksRes] = await Promise.all([
        fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`),
        fetch(`${BASE_URL}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`),
        fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`)
      ]);

      const [artistsData, albumsData, tracksData] = await Promise.all([
        artistsRes.json(),
        albumsRes.json(),
        tracksRes.json()
      ]);

      return {
        artists: processItems(artistsData?.results?.artistmatches?.artist || []),
        albums: processItems(albumsData?.results?.albummatches?.album || []),
        tracks: processItems(tracksData?.results?.trackmatches?.track || []),
      };
    } catch (error) {
      console.error('Search error:', error);
      return { artists: [], albums: [], tracks: [] };
    }
  },

  // Топ артистов
  async getTopArtists(limit = 12) {
    try {
      const res = await fetch(
        `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`
      );
      const data = await res.json();
      return processItems(data?.artists?.artist || []);
    } catch (error) {
      console.error('Top artists error:', error);
      return [];
    }
  },

  // Топ треков
  async getTopTracks(limit = 12) {
    try {
      const res = await fetch(
        `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`
      );
      const data = await res.json();
      
      // Добавляем форматированную длительность для треков
      const processedTracks = processItems(data?.tracks?.track || []);
      return processedTracks.map(track => ({
        ...track,
        durationFormatted: track.duration 
          ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`
          : '--:--'
      }));
    } catch (error) {
      console.error('Top tracks error:', error);
      return [];
    }
  }
};