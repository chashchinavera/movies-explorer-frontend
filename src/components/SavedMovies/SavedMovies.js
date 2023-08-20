import { useState, useEffect } from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ loggedIn, filterMovies, filterDuration, onDelete, onSave, savedMovies }) {

    const [switchOnButton, setSwitchOnButton] = useState(false);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [filteredSavedDurationMovies, setFilteredSavedDurationMovies] = useState([]);

    //Получение отфильтрованного массива фильмов
    function handleMovies(savedFilm, savedRequest, switchOnButton) {
        const savedMoviesFilteredList = filterMovies(savedFilm, savedRequest);

        setFilteredSavedMovies(savedMoviesFilteredList);
        setFilteredSavedDurationMovies(switchOnButton ? filterDuration(savedMoviesFilteredList) : savedMoviesFilteredList);

        localStorage.setItem('allSavedMovies', JSON.stringify(savedMovies));
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesFilteredList));
    }

    //Получение отфильтрованного массива фильмов
    function handleMoviesSearch(savedRequest) {
        localStorage.setItem('savedRequest', savedRequest);
        localStorage.setItem('switchOnButtonSave', switchOnButton);
        if (localStorage.getItem('allSavedMovies')) {
            const savedFilm = JSON.parse(localStorage.getItem('allSavedMovies'));
            handleMovies(savedFilm, savedRequest, switchOnButton);
        } else {
            handleMovies(savedMovies, savedRequest, switchOnButton);
        }
    }

    //Получение отфильтрованного массива короткометражек
    function handleSwitchButton() {
        setSwitchOnButton(!switchOnButton);

        if (!switchOnButton === true) {
            setFilteredSavedDurationMovies(filterDuration(filteredSavedMovies));
        } else {
            setFilteredSavedDurationMovies(filteredSavedMovies);
        }
        localStorage.setItem('switchOnButtonSave', !switchOnButton);
    }


    //Получение отфильтрованного массива фильмов после перезагрузки страницы
    useEffect(() => {
        if (localStorage.getItem('savedMovies')) {
            const savedFilm = JSON.parse(localStorage.getItem('savedMovies'));
            setFilteredSavedMovies(savedFilm);

            if (localStorage.getItem('switchOnButtonSave') === 'true') {
                setSwitchOnButton(true);
                setFilteredSavedDurationMovies(filterDuration(savedFilm));
            } else {
                setSwitchOnButton(false);
                setFilteredSavedDurationMovies(savedFilm);
            }
        }
    }, []);

    return (
        <div className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <main>
                <SearchForm
                    switchOnButton={switchOnButton}
                    setSwitchOnButton={setSwitchOnButton}
                    onSubmit={handleMoviesSearch}
                    onChange={handleSwitchButton}
                />
                <MoviesCardList
                    onDelete={onDelete}
                    onSave={onSave}
                    isMoviesSaved={true}
                    savedMovies={filteredSavedDurationMovies}
                />
            </main>
            <Footer />
        </div>
    )
}

export default SavedMovies;