import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMoviesList({ movies }) {

    return (
        <section className='save__list'>
            <div className='movies__cards'>
                {movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.movieiId}
                        name={movie.nameRU}
                        duration={movie.duration}
                        image={movie.image}
                        movieId={movie.movieId}
                        cardButton={{ state: true }}
                    />
                ))}
            </div>
        </section>
    )
}

export default SavedMoviesList;