import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, cardButton }) {

    return (
        <section className='movies__list'>
            <div className='movies__cards'>
                {cards.map((card) => (
                    <MoviesCard
                        card={card}
                        key={card.movieiId}
                        name={card.nameRU}
                        duration={card.duration}
                        image={card.image}
                        movieId={card.movieId}
                        cardButton={{state:false}}
                    />
                ))}
            </div>
            {cards.length > 4 &&
                <button className='movies__more' type='button' aria-label='Ещё'>
                    Ещё
                </button>}
        </section>
    )
}

export default MoviesCardList;
