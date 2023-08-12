import { useState } from 'react';
import Header from './../Header/Header';

function Profile() {
    const name = 'Виталий';
    const email = 'test@test.ru'

    const [loggedIn, setLoggedIn] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();

        console.log('Данные изменены');
    }

    function handleNameEdit() {
        console.log('Имя изменено');
    }

    function handleEmailEdit() {
        console.log('Email изменен');
    }

    function handleSignOut() {
        console.log('Вы вышли из аккаунта');
    }
    return (
        <section className='profile'>
            <Header
                loggedIn={loggedIn}
            />
            <h2 className='profile__hello'>Привет, {name}!</h2>
            <form
                className='profile__form'
                onSubmit={handleSubmit}
                id='profile'>
                <div className='profile__string'>
                    <span className='profile__text'>Имя</span>
                    <input
                        type='text'
                        onChange={handleNameEdit}
                        value={name}
                        id='input__name'
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
                        onChange={handleEmailEdit}
                        value={email}
                        id='input__email'
                        name='email'
                        className='profile__input'
                        placeholder='E-mail'
                        required
                    />
                </div>
                <div className='profile__links'>
                    <button
                        type='submit'
                        aria-label='Редактировать'
                        className='profile__link'>
                        Редактировать
                    </button>
                    <button
                        type='button'
                        aria-label='Выйти из аккаунта'
                        className='profile__link profile__exit'
                        onClick={handleSignOut}>
                        Выйти из аккаунта
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Profile;