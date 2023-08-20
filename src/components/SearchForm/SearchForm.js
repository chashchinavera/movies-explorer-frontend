import { useState, useEffect } from 'react';

function SearchForm({ switchOnButton, onSubmit, onChange }) {

    const [request, setRequest] = useState('');

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

    useEffect(() => {
        if (localStorage.getItem('request') && window.location.pathname === '/movies') {
            setRequest(localStorage.getItem('request'));
        }else         if (localStorage.getItem('savedRequest') && window.location.pathname === '/saved-movies') {
            setRequest(localStorage.getItem('savedRequest'));
        }
    }, []);

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
                    onClick={onChange}
                />
                <p className='search__text'>Короткометражки</p>
            </div>
        </section>

    )
}

export default SearchForm;
