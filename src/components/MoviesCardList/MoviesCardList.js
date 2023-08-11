import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ initialCards }) {

    return (
        <section className='movies__list'>
            <div className='movies__cards'>
                {initialCards.map((card) => (
                    <MoviesCard
                        card={card}
                        key={card.movieiId}
                        name={card.nameRU}
                        duration={card.duration}
                        image={card.image}
                        movieId={card.movieId}
                    />
                ))}
            </div>
            {initialCards.length > 4 &&
                <button className='movies__more' type='button' aria-label='Ещё'>
                    Ещё
                </button>}
        </section>
    )
}

export default MoviesCardList;
