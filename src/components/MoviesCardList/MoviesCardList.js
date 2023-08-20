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

function MoviesCardList({ movies, isLoading, onDelete, onSave, isMoviesSaved, localMovies }) {

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

    function getSavedMovie(movies, movie) {
        return movies.find((movies) => movies.movieId === movie.id);
    }

    return (
        <section className='movies__list'>
            {isLoading && <Preloader />}
            <div className='movies__cards'>
                {window.location.pathname === '/saved-movies' ? (
                    <>
                        {movies.map((movie) => (
                            <MoviesCard
                                movie={movie}
                                key={movie._id}
                                name={movie.nameRU}
                                duration={movie.duration}
                                image={movie.image}
                                movieId={movie.movieId}
                                trailerLink={movie.trailerLink}
                                cardButton={{ state: true }}
                                onDelete={onDelete}
                                onSave={onSave}
                                isMoviesSaved={isMoviesSaved}
                                savedCard={getSavedMovie(movies, movie)}
                            />
                        ))
                        }
                    </>
                ) : (localMovies ? (movies.length > 0 ?
                    <>
                        {movies.slice(0, moviesAmount).map((movie) => (
                            <MoviesCard
                                movie={movie}
                                key={movie.id}
                                name={movie.nameRU}
                                duration={movie.duration}
                                image={movie.image.url}
                                movieId={movie.movieId}
                                trailerLink={movie.trailerLink}
                                cardButton={{ state: false }}
                            />
                        ))
                        }
                        {movies.length > moviesAmount &&
                            <button className='movies__more' type='button' aria-label='Ещё' onClick={loadMovies}>
                                Ещё
                            </button>}
                    </>
                    : <p className='movies__error'>Фильмы не найдены</p> 
                ) : ''
                )}
            </div>

        </section>
    )
}

export default MoviesCardList;
