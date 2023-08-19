import { useState, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ loggedIn, filterMovies, filterDuration, onDelete, onSave, movies }) {

    const [switchOnButton, setSwitchOnButton] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [request, setRequest] = useState('');

    function handleMoviesSearch(request) {
        setRequest(request);
    }

    function handleSwitchButton() {
        setSwitchOnButton(!switchOnButton);
    }

    useEffect(() => {
        const moviesFilteredList = filterMovies(movies, request);
        setFilteredMovies(switchOnButton ? filterDuration(moviesFilteredList) : moviesFilteredList);
    }, [movies, switchOnButton, request]);

    return (
        <div className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <main>
                <SearchForm
                    switchOnButton={switchOnButton}
                    onSubmit={handleMoviesSearch}
                    onChange={handleSwitchButton}
                    request={request}
                    setRequest={setRequest}
                />
                <MoviesCardList
                    movies={movies}
                    onDelete={onDelete}
                    onSave={onSave}
                    isMoviesSaved={true}
                    />
            </main>
            <Footer />
        </div>
    )
}

export default SavedMovies;