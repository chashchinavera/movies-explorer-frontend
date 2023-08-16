import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { initialCards } from '../../utils/constants';
import Footer from '../Footer/Footer';

function Movies({ loggedIn}) {

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
