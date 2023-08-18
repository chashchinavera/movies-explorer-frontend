import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ loggedIn, movies, switchOnButton, setSwitchOnButton, formSearchMovie, setFormSearchMovie }) {

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
          formSearchMovie={formSearchMovie}
          setFormSearchMovie={setFormSearchMovie}
        />
        <MoviesCardList
          movies={movies}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
