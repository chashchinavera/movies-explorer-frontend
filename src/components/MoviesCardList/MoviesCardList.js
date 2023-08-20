import { useState, useEffect } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import {
    TABLET_WIDTH,
    MOBILE_WIDTH,
    CARDS_AMOUNT_DESKTOP,
    CARDS_AMOUNT_TABLET,
    CARDS_AMOUNT_MOBILE,
    CARDS_LOAD_DESKTOP,
    CARDS_LOAD_MOBILE,
} from "../../config/config";
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, isLoading, onDelete, onSave, isMoviesSaved, localMovies, savedMovies }) {

    const [moviesAmount, setMoviesAmount] = useState(0);

    function handleMoviesLines() {
        const width = window.innerWidth;
        if (width > TABLET_WIDTH) {
            setMoviesAmount(CARDS_AMOUNT_DESKTOP);
        } else if (width > MOBILE_WIDTH && width <= TABLET_WIDTH) {
            setMoviesAmount(CARDS_AMOUNT_TABLET);
        } else if (width <= MOBILE_WIDTH) {
            setMoviesAmount(CARDS_AMOUNT_MOBILE);
        }
    }

    useEffect(() => {
        handleMoviesLines();
    }, []);

    function loadMovies() {
        const width = window.innerWidth;
        if (width > TABLET_WIDTH) {
            setMoviesAmount(moviesAmount + CARDS_LOAD_DESKTOP);
        } else if (width > MOBILE_WIDTH && width <= TABLET_WIDTH) {
            setMoviesAmount(moviesAmount + CARDS_LOAD_MOBILE);
        } else if (width <= MOBILE_WIDTH) {
            setMoviesAmount(moviesAmount + CARDS_LOAD_MOBILE);
        }
    }

    return (
        <section className='movies__list'>
            {isLoading && <Preloader />}
            <div className='movies__cards'>
                {isMoviesSaved ? (
                    <>
                        <div className='movies__grid'>
                            {savedMovies.slice(0, moviesAmount).map((saveMovie) => (
                                <MoviesCard
                                    card={saveMovie}
                                    key={isMoviesSaved ? saveMovie._id : saveMovie.id}
                                    onSave={onSave}
                                    onDelete={onDelete}
                                    isMoviesSaved={isMoviesSaved}
                                    savedCard={savedMovies}
                                    savedMovies={savedMovies}
                                    name={saveMovie.nameRU}
                                    duration={saveMovie.duration}
                                    image={saveMovie.image}
                                    trailerLink={saveMovie.trailerLink}
                                />
                            ))
                            }
                        </div>
                        {savedMovies.length > moviesAmount &&
                            <button className='movies__more' type='button' aria-label='Ещё' onClick={loadMovies}>
                                Ещё
                            </button>}
                    </>
                ) : (localMovies ? (movies.length > 0 ?
                    <>
                        <div className='movies__grid'>
                            {movies.slice(0, moviesAmount).map((movie) => (
                                <MoviesCard
                                    card={movie}
                                    key={isMoviesSaved ? movie._id : movie.id}
                                    onSave={onSave}
                                    onDelete={onDelete}
                                    isMoviesSaved={isMoviesSaved}
                                    savedCard={savedMovies}
                                    savedMovies={savedMovies}
                                    name={movie.nameRU}
                                    duration={movie.duration}
                                    image={movie.image}
                                    trailerLink={movie.trailerLink}
                                />
                            ))
                            }</div>
                        {movies.length > moviesAmount &&
                            <button className='movies__more' type='button' aria-label='Ещё' onClick={loadMovies}>
                                Ещё
                            </button>}
                    </>
                    : <p className='movies__error'>Ничего не найдено</p>
                ) : ''
                )}
            </div>

        </section>
    )
}

export default MoviesCardList;
