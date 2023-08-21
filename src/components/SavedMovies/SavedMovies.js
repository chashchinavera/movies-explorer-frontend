import { useEffect, useState } from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ loggedIn, filterMovies, filterDuration, onDelete, onSave, savedMovies }) {

    const [switchOnButton, setSwitchOnButton] = useState(false);
    const [filteredDurationMovies, setFilteredDurationMovies] = useState(savedMovies);
    const [searchRequest, setSearchRequest] = useState('');

    function handleSwitchButton() {
        setSwitchOnButton(!switchOnButton);
    }

    function handleMovies(request) {
        setSearchRequest(request);
    }

    useEffect(() => {
        const savedMoviesFilteredList = filterMovies(savedMovies, searchRequest);
        setFilteredDurationMovies(switchOnButton ? filterDuration(savedMoviesFilteredList) : savedMoviesFilteredList);
        console.log(filteredDurationMovies)
    }, [savedMovies, searchRequest, switchOnButton])

    return (
        <div className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <main>
                <SearchForm
                    switchOnButton={switchOnButton}
                    onSubmit={handleMovies}
                    onChange={handleSwitchButton}
                />
                <MoviesCardList
                    onDelete={onDelete}
                    onSave={onSave}
                    isMoviesSaved={true}
                    savedMovies={filteredDurationMovies}
                />
            </main>
            <Footer />
        </div>
    )
}

export default SavedMovies;