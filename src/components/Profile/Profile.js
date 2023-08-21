import React from 'react';
import { useState, useEffect } from 'react';
import Header from './../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ loggedIn, onSignOut, onUpdateUser, values, setValues, errors, handleChange, isValid }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email });
    }, [currentUser]);

    function inputDisabled() {
        if ((values.name !== currentUser.name) || (values.email !== currentUser.email)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    useEffect(() => {
        inputDisabled();
    }, [values.name, values.email, currentUser.name, currentUser.email]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: values['name'],
            email: values['email'],
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
                        value={values.name || ''}
                        onChange={handleChange}
                        id='input-name'
                        name='name'
                        className={`profile__input ${errors.name ? 'profile__input_red' : ''}`}
                        placeholder='Имя'
                        required
                        minLength='2'
                        maxLength='30'
                        pattern='^[— А-ЯЁа-яёA-Za-z]+$'
                    />
                </div>
                <span className={`profile__error ${errors.name ? 'profile__error_active' : ''}`}>
                    {errors.name &&
                        'Это поле должно содержать только латиницу, кириллицу, пробел или дефис.'}
                </span>
                <div className='profile__string'>
                    <span className='profile__text'>E-mail</span>
                    <input
                        type='email'
                        value={values.email || ''}
                        onChange={handleChange}
                        id='input-email'
                        name='email'
                        className={`profile__input ${errors.email ? 'profile__input_red' : ''}`}
                        placeholder='E-mail'
                        required
                        minLength='4'
                        maxLength='30'
                        pattern='^\S+@\S+\.\S+$'
                    />
                </div>
                <span className={`profile__error ${errors.email ? 'profile__error_active' : ''}`}>{errors.email}</span>
                <button
                    type='submit'
                    aria-label='Редактировать'
                    className={`profile__link ${!isDisabled && isValid ? '' : 'profile__link_disabled'}`}
                    disabled={isDisabled}
                >
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