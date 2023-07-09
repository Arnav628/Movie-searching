// script.js
const apiKey = '3b8ff0ac16ba4ad7a704e3a8fcdaac38';
const baseUrl = 'https://api.themoviedb.org/3';

// Fetch movie data from the API
async function fetchMovies() {
  try {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Display movies on the page
function displayMovies(movies) {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imageElement = document.createElement('img');
    imageElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieElement.appendChild(imageElement);

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;
    movieElement.appendChild(titleElement);

    const overviewElement = document.createElement('p');
    overviewElement.textContent = movie.overview;
    movieElement.appendChild(overviewElement);

    movieList.appendChild(movieElement);
  });
}

// Search movies based on user input
async function searchMovies(query) {
  try {
    const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.log(error);
    displayMovies([]);
  }
}

// Event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', event => {
  const query = event.target.value;
  searchMovies(query);
});

// Fetch popular movies on page load
window.addEventListener('load', async () => {
  const popularMovies = await fetchMovies();
  displayMovies(popularMovies);
});
