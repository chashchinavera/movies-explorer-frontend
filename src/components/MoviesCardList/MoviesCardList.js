import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {

    return (
        <section className='movies__list'>
            <div className='movies__cards'>
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.movieiId}
                        name={movie.nameRU}
                        duration={movie.duration}
                        image={movie.image.url}
                        movieId={movie.movieId}
                        trailerLink={movie.trailerLink}
                        cardButton={{ state: false }}
                    />
                ))}
            </div>
            {movies.length > 4 &&
                <button className='movies__more' type='button' aria-label='Ещё'>
                    Ещё
                </button>}
        </section>
    )
}

export default MoviesCardList;
