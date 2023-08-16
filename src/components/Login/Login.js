import Header from '../Header/Header';

function Login({ onLogin, formLoginValue, setFormLoginValue }) {

    function handleEmailChange(evt) {
        const { name, value } = evt.target;
        setFormLoginValue({
            ...formLoginValue,
            [name]: value,
        });
    }

    return (
        <section className='login'>
            <div className='login__components'>
                <Header theme={{ short: true }} />
                <h2 className='login__title'>Рады видеть!</h2>
                <form
                    className='login__form'
                    onSubmit={onLogin}
                    id='profile'>
                    <div className='login__column'>
                        <span className='login__text'>E-mail</span>
                        <input
                            type='email'
                            value={formLoginValue.email || ""}
                            onChange={handleEmailChange}
                            id='input-email'
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
                            value={formLoginValue.password || ""}
                            onChange={handleEmailChange}
                            id='input-password'
                            name='password'
                            className='login__input'
                            placeholder='1234'
                            required
                            minLength='2'
                            maxLength='40'
                        />
                    </div>
                    <button className='login__link'>
                        Войти
                    </button>
                </form>
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
