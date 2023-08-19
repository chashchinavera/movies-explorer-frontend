import Header from '../Header/Header';

function Register({ formRegisterValue, setFormRegisterValue, onRegister, isSuccess, errorMessage }) {

    function handleEmailChange(evt) {
        const { name, value } = evt.target;
        setFormRegisterValue({
            ...formRegisterValue,
            [name]: value,
        });
    }

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
                            value={formRegisterValue.name}
                            onChange={handleEmailChange}
                            id='input-name'
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
                            type='email'
                            value={formRegisterValue.email}
                            onChange={handleEmailChange}
                            id='input-email'
                            name='email'
                            className={`register__input ${errorMessage ? 'register__input_red' : ''}`}
                            placeholder='E-mail'
                            required
                            minLength='2'
                            maxLength='40'
                            pattern="^[А-ЯЁа-яёA-Za-z -]+$"
                        />
                        <p className='register__error'>
                            {errorMessage &&
                                "Это поле должно содержать только латиницу, кириллицу, пробел или дефис."}
                        </p>
                    </div>
                    <div className='register__column'>
                        <span className='register__text'>Пароль</span>
                        <input
                            type='password'
                            value={formRegisterValue.password}
                            onChange={handleEmailChange}
                            id='input-password'
                            name='password'
                            className={`register__input ${errorMessage && !isSuccess ? 'register__input_red' : ''}`}
                            placeholder='Пароль'
                            required
                            minLength='4'
                            maxLength='40'
                        />
                        <p className='register__error'>{errorMessage && !isSuccess ? 'Что-то пошло не так...' : ''}</p>
                    </div>
                    <button
                        type='submit'
                        aria-label='Зарегистрироваться'
                        className='register__link'>
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
