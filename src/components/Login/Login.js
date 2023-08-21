import Header from '../Header/Header';

function Login({ onLogin, values, errors, isValid, handleChange }) {

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
                            value={values.email}
                            onChange={handleChange}
                            id='input-email'
                            name='email'
                            className={`login__input ${errors.email ? 'login__input_red' : ''}`}
                            placeholder='E-mail'
                            required
                            minLength='4'
                            maxLength='30'
                            pattern='^\S+@\S+\.\S+$'
                        />
                        <span className='login__error'>{errors.email}</span>
                    </div>
                    <div className='login__column'>
                        <span className='login__text'>Пароль</span>
                        <input
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            id='input-password'
                            name='password'
                            className={`login__input ${errors.password ? 'login__input_red' : ''}`}
                            placeholder='Пароль'
                            required
                            minLength='4'
                            maxLength='40'
                        />
                        <span className='login__error'>{errors.password}</span>
                    </div>
                    <button
                        className={`login__link ${!isValid ? 'login__link_disabled' : ''}`}
                        disabled={!isValid}
                    >
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
