import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.png';

function Header() {

    return (
        <header className='header'>
            <Link to='/'><img className='header__logo' src={logo} alt='Логотип Movies' /></Link>
            <div className='header__links'>
                <Link to='/signup' className='header__register'>Регистрация</Link>
                <Link to='/signin' className='header__login'>Войти</Link>
            </div>
        </header>
    )
}

export default Header;
