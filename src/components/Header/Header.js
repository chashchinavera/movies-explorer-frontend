import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, theme }) {

    const [openBurgerButton, setOpenBurgerButton] = useState(false);

    function handleOpenBurgerButton() {
        setOpenBurgerButton(!openBurgerButton);
    }

    return (
        <header className='header'>
            <Link to='/' className={`header__logo ${theme.short ? 'header__logo_short' : ''}`} />
            {!theme.short && (!loggedIn ? (
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
            )
            }
        </header >
    )
}

export default Header;
