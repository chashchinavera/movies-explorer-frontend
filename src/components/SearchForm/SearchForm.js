import { useState, useEffect } from 'react';

function SearchForm({ switchOnButton, onSubmit, onChange }) {

    const [request, setRequest] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    function handleRequestEdit(evt) {
        setRequest(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(request);
    }

    useEffect(() => {
        if (localStorage.getItem('request') && window.location.pathname === '/movies') {
            setRequest(localStorage.getItem('request'));
        }
    }, []);

    useEffect(() => {
        if (request.trim().length !== 0) {
            setIsDisabled(false);
        } else {
        setIsDisabled(true);
        }
    }, [request]);

    return (
        <section className='search'>
            <form
                className='search__form'
                onSubmit={handleSubmit}
                id='search'>
                <input
                    className={`search__input`}
                    type='text'
                    value={request}
                    onChange={handleRequestEdit}
                    placeholder={window.location.pathname === '/movies' ? 'Нужно ввести ключевое слово' : 'Фильм'}
                    required
                    name='search'
                />
                <button className={`search__submit ${isDisabled ? 'search__submit_disabled' : 'search__submit:hover'}`}
                    type='submit' aria-label='Поиск фильмов' disabled={isDisabled} />

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
