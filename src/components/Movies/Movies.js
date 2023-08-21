import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { initialCards } from '../../utils/constants';
import Footer from '../Footer/Footer';

function Movies() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      setCards(initialCards);
    }
  }, [loggedIn])

  return (
    <div className='movies'>
      <Header
        theme={{ short: false }}
        loggedIn={loggedIn}
      />
      <main>
        <SearchForm />
        <MoviesCardList
          cards={initialCards}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
