import Header from '../Header/Header';

function Register() {
    const name = 'Виталий';
    const email = 'test@test.ru'

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Вы зарегистрировались')
    }

    return (
        <section className='register'>
            <div className='register__components'>
                <Header theme={{ short: true }} />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form
                    className='register__form'
                    onSubmit={handleSubmit}
                    id='profile'>
                    <div className='register__column'>
                        <span className='register__text'>Имя</span>
                        <input
                            type='text'
                            value={name}
                            id='input__name'
                            name='name'
                            className='register__input'
                            placeholder='Имя'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                    </div>
                    <div className='register__column'>
                        <span className='register__text'>E-mail</span>
                        <input
                            type='text'
                            value={email}
                            id='input__email'
                            name='email'
                            className='register__input'
                            placeholder='E-mail'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                    </div>
                    <div className='register__column'>
                        <span className='register__text'>Пароль</span>
                        <input
                            type='password'
                            value={name}
                            id='input__password'
                            name='password'
                            className='register__input'
                            placeholder='1234'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                        <p className='register__error'>Что-то пошло не так...</p>
                    </div>
                </form>

                <button
                    type='button'
                    aria-label='Зарегистрироваться'
                    className='register__link'
                    onClick={handleSubmit}>
                    Зарегистрироваться
                </button>
                <div className='register__question'>
                    <p className='register__signature'>Уже зарегистрированы?
                        <a href='/signin' className='register__entry'>Войти</a>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register;
