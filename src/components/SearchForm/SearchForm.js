import { useState } from 'react';

function SearchForm() {

    const [switchOnButton, setSwitchOnButton] = useState(false);

    function handleToggleSwitch() {
        setSwitchOnButton(!switchOnButton);
    }

    return (
        <section className='search'>
            <div className='search__movie'>
                <input
                    className='search__input'
                    type='text'
                    placeholder='Фильм'
                    required />
                <button className='search__submit' type='button' aria-label='Поиск фильмов' />

            </div>
            <div className='search__shorts'>
                <button
                    className={`search__switch-button ${switchOnButton ? 'search__switch-on' : ''}`}
                    type='button'
                    aria-label='Поиск короткометражек'
                    onClick={handleToggleSwitch}
                />
                <p className='search__text'>Короткометражки</p>
            </div>
        </section>

    )
}

export default SearchForm;
