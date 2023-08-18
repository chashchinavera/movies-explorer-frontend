import { useState } from 'react';
import { movieDuration } from "../../utils/constants";
import { BASE_URL } from '../../config/config';

function MoviesCard({ name, image, duration, cardButton }) {

    const [saveButton, setSaveButton] = useState(false);

    function handleSaveButton() {
        setSaveButton(!saveButton);
    }

    return (
        <div className='movie'>
            <img className='movie__image' alt={name} src={`${BASE_URL}/${image}`} />
            <button
                className={`movie__button ${cardButton.state ? 'movie__delete' : ''} ${!cardButton.state && saveButton ? 'movie__button_active' : ''}`}
                type='button'
                aria-label='Сохранить'
                onClick={handleSaveButton}
            >
                {!cardButton.state && !saveButton ? 'Сохранить' : ''}
            </button>
            <div className='movie__info'>
                <p className='movie__title'>{name}</p>
                <p className='movie__duration'>{movieDuration({ duration })}</p>
            </div>
        </div>
    )
}

export default MoviesCard;
