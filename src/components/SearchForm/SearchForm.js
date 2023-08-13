import { useState } from 'react';

function SearchForm() {

    const [switchOnButton, setSwitchOnButton] = useState(false);

    function handleToggleSwitch() {
        setSwitchOnButton(!switchOnButton);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Поиск фильма')
    }

    return (
        <section className='search'>
            <form
                className='search__form'
                onSubmit={handleSubmit}
                id='search'>
                <input
                    className='search__input'
                    type='text'
                    placeholder='Фильм'
                    required />
                <button className='search__submit' type='button' aria-label='Поиск фильмов' />

            </form>
            <div className='search__shorts'>
                <button
                    className={`search__switch-button ${switchOnButton ? 'search__switch-on' : ''}`}
                    type='submit'
                    aria-label='Поиск короткометражек'
                    onClick={handleToggleSwitch}
                />
                <p className='search__text'>Короткометражки</p>
            </div>
        </section>

    )
}

export default SearchForm;
