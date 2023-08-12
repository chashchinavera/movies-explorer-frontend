import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    return (
        <header className='header'>
            <Link to='/'><img className='header__logo' src={logo} alt='Логотип Movies' /></Link>
            {!loggedIn ? (
                <div className='header__links'>
                    <Link to='/signup' className='header__register'>Регистрация</Link>
                    <Link to='/signin' className='header__login'>Войти</Link>
                </div >
            ) : (
                <>
                    <button className='header__burger' />

                    <div className='header__overlay'>

                        <Navigation />
                    </div>
                </>
            )
            }
        </header >
    )
}

export default Header;
