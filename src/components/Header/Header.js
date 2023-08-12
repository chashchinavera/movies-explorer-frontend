import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../images/header__logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

    const [openBurgerButton, setOpenBurgerButton] = useState(false);

    function handleOpenBurgerButton() {
        setOpenBurgerButton(!openBurgerButton);
    }

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
                    <button className='header__burger' type='button' aria-label='Открыть бургерное меню' onClick={handleOpenBurgerButton} />
                    <div className={`header__overlay ${openBurgerButton ? 'header__overlay_active' : ''}`}>
                        <button
                            type='button'
                            aria-label='Закрыть бургерное меню'
                            className='header__close'
                            onClick={handleOpenBurgerButton}
                        />
                        <Navigation
                            isBurgerOpen={openBurgerButton}
                        />
                    </div>
                </>
            )
            }
        </header >
    )
}

export default Header;
