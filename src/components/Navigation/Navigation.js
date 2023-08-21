import { Link } from 'react-router-dom';

function Navigation({ openBurgerButton }) {

    return (
        <div className={`navigation ${openBurgerButton ? 'navigation_active' : ''}`}>
            <div className='navigation__movies'>
                <Link to='/' className={`navigation__main ${window.location.pathname === '/' ? 'navigation__underline' : ''}`}>Главная</Link>
                <Link to='/movies' className={`navigation__link ${window.location.pathname === '/movies' ? 'navigation__underline' : ''}`}>Фильмы</Link>
                <Link to='/saved-movies' className={`navigation__link navigation__movie ${window.location.pathname === '/saved-movies' ? 'navigation__underline' : ''}`} id='saved-movies'>Сохранённые фильмы</Link>
            </div>
            <Link to='/profile' className='navigation__link navigation__account'>Аккаунт</Link>
        </div>
    )
}

export default Navigation;
