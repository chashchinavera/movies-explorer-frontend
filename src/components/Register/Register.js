import Header from '../Header/Header';

function Register({ onRegister, values, errors, isValid, handleChange }) {


    return (
        <section className='register'>
            <div className='register__components'>
                <Header theme={{ short: true }} />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form
                    className='register__form'
                    onSubmit={onRegister}
                    id='profile'>
                    <div className='register__column'>
                        <span className='register__text'>Имя</span>
                        <input
                            type='text'
                            value={values.name || ''}
                            onChange={handleChange}
                            id='input-name'
                            name='name'
                            className={`register__input ${errors.name ? 'register__input_red' : ''}`}
                            placeholder='Имя'
                            required
                            minLength='2'
                            maxLength='30'
                            pattern='^[— А-ЯЁа-яёA-Za-z]+$'
                        />
                        <span className='register__error'>
                            {errors.name &&
                                'Это поле должно содержать только латиницу, кириллицу, пробел или дефис.'}
                        </span>
                    </div>
                    <div className='register__column'>
                        <span className='register__text'>E-mail</span>
                        <input
                            type='email'
                            value={values.email || ''}
                            onChange={handleChange}
                            id='input-email'
                            name='email'
                            className={`register__input ${errors.email ? 'register__input_red' : ''}`}
                            placeholder='E-mail'
                            required
                            minLength='4'
                            maxLength='30'
                            pattern='^\S+@\S+\.\S+$'
                        />
                        <span className='register__error'>{errors.email}</span>
                    </div>
                    <div className='register__column'>
                        <span className='register__text'>Пароль</span>
                        <input
                            type='password'
                            value={values.password || ''}
                            onChange={handleChange}
                            id='input-password'
                            name='password'
                            className={`register__input ${errors.password ? 'register__input_red' : ''}`}
                            placeholder='Пароль'
                            required
                            minLength='4'
                            maxLength='30'
                        />
                        <span className='register__error'>{errors.password}</span>
                    </div>
                    <button
                        type='submit'
                        aria-label='Зарегистрироваться'
                        className={`register__link ${!isValid ? 'register__link_disabled' : ''}`}
                        disabled={!isValid}
                    >
                        Зарегистрироваться
                    </button>
                </form>
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
