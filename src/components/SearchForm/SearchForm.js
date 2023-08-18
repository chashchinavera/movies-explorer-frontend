import { useState } from 'react';

function SearchForm({ switchOnButton, setSwitchOnButton, onSubmit }) {

    const [request, setRequest] = useState('');

    function handleToggleSwitch() {
        setSwitchOnButton(!switchOnButton);
    }

    function handleRequestEdit(evt) {
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (request.trim().length === 0) {
        } else {
            onSubmit(request);
        }
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
                    value={request || ''}
                    onChange={handleRequestEdit}
                    placeholder='Фильм'
                    required />
                <button className='search__submit' type='submit' aria-label='Поиск фильмов' />

            </form>
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
