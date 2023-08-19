import { useState } from 'react';
import { movieDuration } from '../../utils/constants';
import { BASE_URL } from '../../config/config';

function MoviesCard({ card, name, image, duration, cardButton, trailerLink, onDelete, onSave, movies, isMoviesSaved }) {

    const [saveButton, setSaveButton] = useState(false);


    function handleSaveButton() {
        if (saveButton) {
            onDelete(movies.filter((movie) => movie.movieId === card.id)[0]);
        } else {
            onSave(card);
        }
    }

    // function handleDeleteButton() {
    //     onDelete(card);
    // }

    return (
        <div className='movie'>
            <img className='movie__image' alt={name} src={!isMoviesSaved ? `${BASE_URL}${image}` : image} />
            <button
                className={`movie__button ${cardButton.state ? 'movie__delete' : ''} ${!cardButton.state && saveButton ? 'movie__button_active' : ''}`}
                type='button'
                aria-label='Сохранить'
                onClick={handleSaveButton}
            >
                {!cardButton.state && !saveButton ? 'Сохранить' : ''}
            </button>
            <div className='movie__info'>
                <a className='movie__title' href={trailerLink} target='_blank' rel='noreferrer'>{name}</a>
                <p className='movie__duration'>{movieDuration({ duration })}</p>
            </div>
        </div>
    )
}

export default MoviesCard;
