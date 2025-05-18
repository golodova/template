/**
 * Сервис для работы с Last.fm API
 */
const API_KEY = 'dc08979bf5f907d92ed624ad7e31df4c';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const DEFAULT_IMAGE = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

// Универсальная функция для получения лучшего изображения
function getBestImageUrl(images) {
  if (!Array.isArray(images)) return DEFAULT_IMAGE;
  
  const sizes = ['extralarge', 'large', 'medium', 'small'];
  for (const size of sizes) {
    const image = images.find(img => img.size === size);
    if (image && image['#text'] && !image['#text'].includes('/noimage/')) {
      return image['#text'];
    }
  }
  
  return DEFAULT_IMAGE;
}

// Универсальная функция для обработки элементов с изображениями
function processItems(items) {
  if (!items) return [];
  return items.map(item => ({
    ...item,
    imageUrl: getBestImageUrl(item.image)
  }));
}

/**
 * Получить топ артистов
 */
export async function getTopArtists(limit = 12) {
  try {
    const response = await fetch(`${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`);
    if (!response.ok) throw new Error('Ошибка сети');
    const data = await response.json();
    
    return processItems(data.artists?.artist);
  } catch (error) {
    console.error('Ошибка при получении топ артистов:', error);
    throw error;
  }
}

/**
 * Получить популярные треки
 */
export async function getTopTracks(limit = 15) {
  try {
    const response = await fetch(`${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`);
    if (!response.ok) throw new Error('Ошибка сети');
    const data = await response.json();
    
    return processItems(data.tracks?.track);
  } catch (error) {
    console.error('Ошибка при получении топ треков:', error);
    throw error;
  }
}

/**
 * Выполнить поиск
 */
export async function search(query, limit = 8) {
  try {
    const [artistsRes, albumsRes, tracksRes] = await Promise.all([
      fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`),
      fetch(`${BASE_URL}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`),
      fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=10`)
    ]);

    if (!artistsRes.ok || !albumsRes.ok || !tracksRes.ok) throw new Error('Ошибка сети');

    const [artistsData, albumsData, tracksData] = await Promise.all([
      artistsRes.json(),
      albumsRes.json(),
      tracksRes.json()
    ]);

    return {
      artists: processItems(artistsData.results?.artistmatches?.artist),
      albums: processItems(albumsData.results?.albummatches?.album),
      tracks: processItems(tracksData.results?.trackmatches?.track).map(track => ({
        ...track,
        artistUrl: `https://www.last.fm/music/${encodeURIComponent(track.artist)}`
      }))
    };
  } catch (error) {
    console.error('Ошибка при поиске:', error);
    throw error;
  }
}