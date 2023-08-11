import { useState } from 'react';

function SearchForm() {

    const [ switchOnButton, setSwitchOnButton ] = useState(false);

    function handleToggleSwitch() {
        setSwitchOnButton(!switchOnButton);
    }

    return (
        <div className='search'>
            <div className='search__movie'>
                <input
                    className="search__input"
                    type="text"
                    placeholder="Фильм"
                    required />
                <button className="search__submit" />

            </div>
            <div className='search__shorts'>
                <button className={`search__switch-button ${switchOnButton ? 'search__switch-on' : ''}`}
                onClick={handleToggleSwitch}
                />
                <p className="search__text">Короткометражки</p>
            </div>
        </div>

    )
}

export default SearchForm;
