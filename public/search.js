import { search } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchQueryText = document.getElementById('search-query-text');
  const navItems = document.querySelectorAll('.nav-item');
  const likeButtons = document.querySelectorAll('.like-button');
  const artistsGrid = document.querySelector('.artists-grid');
  const albumsGrid = document.querySelector('.albums-grid');
  const tracksList = document.querySelector('.tracks-list');
  const noResultsMessage = document.createElement('div');
  noResultsMessage.className = 'no-results';
  noResultsMessage.textContent = 'Ничего не найдено. Попробуйте другой запрос.';

  // Обработчик поиска
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });

  // Обработчик навигации
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      document.querySelector(this.getAttribute('href')).scrollIntoView();
    });
  });

  // Обработчик лайков
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('liked');
      this.textContent = this.classList.contains('liked') ? '♥' : '♡';
    });
  });

  /**
   * Выполнить поиск и отобразить результаты
   */
  async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    searchQueryText.textContent = query;
    searchResults.classList.remove('hidden');
    
    try {
      // Показать индикатор загрузки
      artistsGrid.innerHTML = '<div class="loading">Загрузка...</div>';
      albumsGrid.innerHTML = '<div class="loading">Загрузка...</div>';
      tracksList.innerHTML = '<div class="loading">Загрузка...</div>';

      const results = await search(query);

      // Отобразить артистов
      renderArtists(results.artists);
      
      // Отобразить альбомы
      renderAlbums(results.albums);
      
      // Отобразить треки
      renderTracks(results.tracks);

    } catch (error) {
      console.error('Ошибка поиска:', error);
      searchResults.appendChild(noResultsMessage);
    }
  }

  /**
   * Отобразить список артистов
   * @param {Array} artists - Массив артистов
   */
  function renderArtists(artists) {
    artistsGrid.innerHTML = '';
    
    if (!artists || artists.length === 0) {
      artistsGrid.appendChild(noResultsMessage.cloneNode(true));
      return;
    }

    artists.slice(0, 8).forEach(artist => {
      const artistCard = document.createElement('div');
      artistCard.className = 'artist-card';
      // Для артистов
artistCard.innerHTML = `
  <div class="artist-image-container">
    <img src="${artist.imageUrl}" 
         alt="${artist.name}" class="artist-image">
    <div class="artist-info">
      <p class="artist-name">${artist.name}</p>
      <p class="artist-type">${artist.listeners || 0} слушателей</p>
    </div>
  </div>
`;
      artistCard.addEventListener('click', () => {
        window.open(artist.url, '_blank');
      });
      artistsGrid.appendChild(artistCard);
    });
  }

  /**
   * Отобразить список альбомов
   * @param {Array} albums - Массив альбомов
   */
  function renderAlbums(albums) {
    albumsGrid.innerHTML = '';
    
    if (!albums || albums.length === 0) {
      albumsGrid.appendChild(noResultsMessage.cloneNode(true));
      return;
    }

    albums.slice(0, 8).forEach(album => {
      const albumCard = document.createElement('div');
      albumCard.className = 'album-card';
      // Для альбомов
albumCard.innerHTML = `
  <div class="album-image-container">
    <img src="${album.imageUrl}" 
         alt="${album.name}" class="album-image">
    <div class="album-info">
      <p class="album-title">${album.name}</p>
      <p class="album-artist">${album.artist}</p>
    </div>
  </div>
`;
      albumCard.addEventListener('click', () => {
        window.open(`https://www.last.fm/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`, '_blank');
      });
      albumsGrid.appendChild(albumCard);
    });
  }

  /**
   * Отобразить список треков
   * @param {Array} tracks - Массив треков
   */
  /**
 * Отобразить список треков
 * @param {Array} tracks - Массив треков
 */
function renderTracks(tracks) {
  tracksList.innerHTML = '';
  
  if (!tracks || tracks.length === 0) {
    tracksList.appendChild(noResultsMessage.cloneNode(true));
    return;
  }

  tracks.slice(0, 10).forEach(track => {
    // Преобразуем длительность из миллисекунд в MM:SS
    const duration = track.duration 
      ? formatDuration(Math.floor(track.duration / 1000)) 
      : '--:--';
    
    const trackItem = document.createElement('div');
    trackItem.className = 'track-item';
    trackItem.innerHTML = `
      <button class="play-button">▶</button>
      <img src="${track.imageUrl || DEFAULT_IMAGE}" 
           alt="${track.name}" class="track-thumbnail">
      <button class="like-button">♡</button>
      <div class="track-main-info">
        <p class="track-title">${track.name}</p>
      </div>
      <div class="track-secondary-info">
        <p class="track-artist">${track.artist}</p>
        <p class="track-duration">${duration}</p>
      </div>
      <div class="track-divider"></div>
    `;
    
    // Обработчики для кнопок
    const playBtn = trackItem.querySelector('.play-button');
    const likeBtn = trackItem.querySelector('.like-button');
    
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Здесь можно добавить воспроизведение трека
    });
    
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      likeBtn.classList.toggle('liked');
      likeBtn.textContent = likeBtn.classList.contains('liked') ? '♥' : '♡';
    });
    
    trackItem.addEventListener('click', () => {
      window.open(track.url, '_blank');
    });
    
    tracksList.appendChild(trackItem);
  });
}
  /**
   * Форматировать длительность трека (секунды в MM:SS)
   * @param {number} seconds - Длительность в секундах
   * @returns {string} Отформатированная длительность
   */
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '--:--';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
});