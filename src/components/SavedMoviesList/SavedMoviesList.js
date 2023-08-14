import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMoviesList({ cards, cardButton }) {

    return (
        <section className='save__list'>
            <div className='movies__cards'>
                {cards.map((card) => (
                    <MoviesCard
                        card={card}
                        key={card.movieiId}
                        name={card.nameRU}
                        duration={card.duration}
                        image={card.image}
                        movieId={card.movieId}
                        cardButton={{state:true}}
                    />
                ))}
            </div>
        </section>
    )
}

export default SavedMoviesList;