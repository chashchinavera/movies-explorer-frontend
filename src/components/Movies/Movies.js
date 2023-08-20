import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';

function Movies({ loggedIn, filterMovies, filterDuration, onSave }) {

  const [switchOnButton, setSwitchOnButton] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredDurationMovies, setFilteredDurationMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localMovies, setLocalMovies] = useState(false);

  //Получение отфильтрованного массива фильмов
  function handleMovies(movies, request, switchOnButton) {
    const moviesFilteredList = filterMovies(movies, request);

    setFilteredMovies(moviesFilteredList);
    setFilteredDurationMovies(switchOnButton ? filterDuration(moviesFilteredList) : moviesFilteredList);

    localStorage.setItem('allMovies', JSON.stringify(movies));
    localStorage.setItem('movies', JSON.stringify(moviesFilteredList));
  }

  //Получение отфильтрованного массива фильмов
  function handleMoviesSearch(request) {
    localStorage.setItem('request', request);
    localStorage.setItem('switchOnButton', switchOnButton);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleMovies(movies, request, switchOnButton);
    } else {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          handleMovies(movies, request, switchOnButton);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  //Получение отфильтрованного массива короткометражек
  function handleSwitchButton() {
    setSwitchOnButton(!switchOnButton);
    if (!switchOnButton) {
      setFilteredDurationMovies(filterDuration(filteredMovies));
    }
    localStorage.setItem('switchOnButton', !switchOnButton);
  }

  //Получение отфильтрованного массива фильмов после перезагрузки страницы
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setLocalMovies(true);
      setFilteredMovies(movies);
      if (localStorage.getItem('switchOnButton') === 'true') {
        setSwitchOnButton(true);
        setFilteredDurationMovies(filterDuration(movies));
      } else {
        setSwitchOnButton(false);
        setFilteredDurationMovies(movies);
      }
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
          onChange={handleSwitchButton}
        />
        <MoviesCardList
          movies={filteredDurationMovies}
          isLoading={isLoading}
          isMoviesSaved={false}
          onSave={onSave}
          localMovies={localMovies}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
