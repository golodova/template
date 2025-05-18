document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchQueryText = document.getElementById('search-query-text');
  const navItems = document.querySelectorAll('.nav-item');
  const likeButtons = document.querySelectorAll('.like-button');

  // Обработчик поиска
  searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query) {
      searchQueryText.textContent = query;
      searchResults.classList.remove('hidden');
      // Здесь можно добавить реальный поиск через API
    }
  });

  // Обработчик навигации
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Обработчик лайков
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('liked');
      this.textContent = this.classList.contains('liked') ? '♥' : '♡';
    });
  });
});