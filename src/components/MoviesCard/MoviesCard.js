import { movieDuration } from '../../utils/constants';
import { BASE_URL } from '../../config/config';

function MoviesCard({ card, name, image, duration, trailerLink, onDelete, onSave, isMoviesSaved, savedMovies }) {

    const isSaved = savedMovies && savedMovies.some((movie) => movie.movieId === card.id);

    function handleButtonClick() {
        if (isSaved) {
            onDelete(savedMovies.find((movie) => movie.movieId === card.id));
        } else {
            onSave(card);
        }
    };

    function handleDeleteCard() {
        onDelete(card);
    }

    return (
        <div className='movie' id={card._id}>
            <img className='movie__image' alt={name} src={!isMoviesSaved ? `${BASE_URL}${image.url}` : image} />
            <button
                className={`movie__button ${isMoviesSaved ? 'movie__delete' : ''}${isSaved ? 'movie__button_active' : ''}`}
                type='button'
                aria-label='Сохранить'
                onClick={isMoviesSaved ? handleDeleteCard : handleButtonClick}
            >
                {isSaved || isMoviesSaved ? '' : 'Сохранить'}
            </button>
            <div className='movie__info'>
                <a className='movie__title' href={trailerLink} target='_blank' rel='noreferrer'>{name}</a>
                <p className='movie__duration'>{movieDuration({ duration })}</p>
            </div>
        </div>
    )
}

export default MoviesCard;
