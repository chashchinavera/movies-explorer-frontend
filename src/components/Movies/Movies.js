import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies({ loggedIn, filterMovies, filterDuration }) {

  const [switchOnButton, setSwitchOnButton] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function getFilteredMovies(movies, request) {
    const moviesFilteredList = filterMovies(movies, request);

    setFilteredMovies(moviesFilteredList);

    localStorage.setItem('allMovies', JSON.stringify(movies));
    localStorage.setItem('movies', JSON.stringify(moviesFilteredList));
  }

  function handleMoviesSearch(request) {
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      getFilteredMovies(movies, request);
    } else {
      moviesApi.getMovies()
        .then((movies) => {
          getFilteredMovies(movies, request, switchOnButton);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setFilteredMovies(movies);
    }
  }, []);

  return (
    <div className='movies'>
      <Header
        theme={{ short: false }}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm
          switchOnButton={switchOnButton}
          setSwitchOnButton={setSwitchOnButton}
          onSubmit={handleMoviesSearch}
        />
        <MoviesCardList
          movies={filteredMovies}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
