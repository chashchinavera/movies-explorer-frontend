import { useState, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesList from '../SavedMoviesList/SavedMoviesList';
import SearchForm from "../SearchForm/SearchForm";
import { savedCards } from '../../utils/constants';

function SavedMovies() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (loggedIn) {
            setCards(savedCards);
        }
    }, [loggedIn])

    return (
        <main className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <SearchForm />
            <SavedMoviesList
                cards={savedCards}
            />
            <Footer />
        </main>
    )
}

export default SavedMovies;