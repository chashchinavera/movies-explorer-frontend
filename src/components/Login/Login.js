import Header from '../Header/Header';

function Login() {
    const name = 'Виталий';
    const email = 'test@test.ru'

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Вы зарегистрировались')
    }

    return (
        <section className='login'>
            <div className='login__components'>
                <Header theme={{ short: true }} />
                <h2 className='login__title'>Рады видеть!</h2>
                <form
                    className='login__form'
                    onSubmit={handleSubmit}
                    id='profile'>
                    <div className='login__column'>
                        <span className='login__text'>E-mail</span>
                        <input
                            type='text'
                            value={email}
                            id='input__email'
                            name='email'
                            className='login__input'
                            placeholder='E-mail'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                    </div>
                    <div className='login__column'>
                        <span className='login__text'>Пароль</span>
                        <input
                            type='password'
                            value={name}
                            id='input__password'
                            name='password'
                            className='login__input'
                            placeholder='1234'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                    </div>
                </form>

                <button
                    type='button'
                    aria-label='Зарегистрироваться'
                    className='login__link'
                    onClick={handleSubmit}>
                    Зарегистрироваться
                </button>
                <div className='login__question'>
                    <p className='login__signature'>Ещё не зарегистрированы?
                        <a href='/signup' className='login__entry' >Регистрация</a>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login;
