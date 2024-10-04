import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearch] = useState('');
  const [favorites, setFavorite] = useState([]);

  // Fetch Movies from API based on search term
  async function getMovie(searchMovie) {
    const url = "http://www.omdbapi.com";
    const response = await fetch(`${url}?s=${searchMovie}&apikey=2c8d0989`);
    const data = await response.json();
    console.log(data.Search);
    if (data.Search) {
      setMovies(data.Search);
    }
  }

  useEffect(() => {
    if (searchMovie) {
      getMovie(searchMovie);
    }
  }, [searchMovie]);

  // Load favorites from localStorage on app load
  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    if (movieFavorites) {
      setFavorite(movieFavorites);
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  // Add Movie to Favorite list
  const addFavoriteClick = (movie) => {
    const newFavoriteMovies = [...favorites, movie];
    setFavorite(newFavoriteMovies);
    saveToLocalStorage(newFavoriteMovies);
  };

  // Remove Movie from Favorite list
  const removeFavoriteClick = (movie) => {
    const updatedFavoriteMovies = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorite(updatedFavoriteMovies);
    saveToLocalStorage(updatedFavoriteMovies);
  };

  // Check if movie is already in the favorites
  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* Home page with search and movies */}
          <Route
            path="/"
            element={
              <>
                <SearchBar searchMovie={searchMovie} setSearch={setSearch} />
                {searchMovie === '' ? (
                  <div className='text-3xl text-white'>Loading...</div>
                ) : (
                  <MovieCard
                    movies={movies}
                    favorites={favorites} // Pass favorites to MovieCard
                    handleFavoriteClicks={(movie) => isFavorite(movie) ? removeFavoriteClick(movie) : addFavoriteClick(movie)} // Handle add/remove based on state
                  />
                )}
              </>
            }
          />

          {/* Favorites Page */}
          <Route
            path="/favorites"
            element={
              <div className='container flex flex-col space-y-24 mt-20'>
                <h1 className='text-3xl md:text-5xl font-bold text-white'>Your favourite Movies</h1>
                {favorites.length === 0 ? <h1>No Favourite Movies</h1> :
                  <MovieCard
                    movies={favorites}
                    favorites={favorites} // Pass favorites to MovieCard
                    handleFavoriteClicks={removeFavoriteClick} // Only remove in favorites
                  />
                }
              </div>
            }
          />

          {/* Movie Detail Page */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
