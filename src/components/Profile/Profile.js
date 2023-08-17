import React from 'react';
import { useState, useEffect } from 'react';
import Header from './../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ loggedIn, onSignOut, onUpdateUser, email, setEmail}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

        function handleNameEdit(evt) {
        setName(evt.target.value);
    }

    function handleEmailEdit(evt) {
        setEmail(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            email,
        });
    }

    return (
        <section className='profile'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <h2 className='profile__hello'>Привет, {currentUser.name}!</h2>
            <form
                onSubmit={handleSubmit}
                className='profile__form'
            >
                <div className='profile__string'>
                    <span className='profile__text'>Имя</span>
                    <input
                        type='text'
                        value={name}
                        onChange={handleNameEdit}
                        id='input-name'
                        name='name'
                        className='profile__input'
                        placeholder='Имя'
                        required
                        minLength='2'
                        maxLength='40'
                    />
                </div>
                <span className='profile__line' />
                <div className='profile__string'>
                    <span className='profile__text'>E-mail</span>
                    <input
                        type='email'
                        value={email}
                        onChange={handleEmailEdit}
                        id='input-email'
                        name='email'
                        className='profile__input'
                        placeholder='E-mail'
                        required
                    />
                </div>
                <button
                    type='submit'
                    aria-label='Редактировать'
                    className='profile__link'>
                    Редактировать
                </button>
            </form>
            <button
                type='button'
                aria-label='Выйти из аккаунта'
                className='profile__link profile__exit'
                onClick={onSignOut}
                >
                Выйти из аккаунта
            </button>
        </section>
    )
}

export default Profile;