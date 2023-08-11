import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <div className='navigation'>
            <div className='navigation__movies'>
                <Link to='/movies' className='navigation__link'>Фильмы</Link>
                <Link to='/movies' className='navigation__link navigation__movie'>Сохраненные фильмы</Link>
            </div>
            <Link to='/profile' className='navigation__link navigation__account'>Аккаунт</Link>
        </div>
    )
}

export default Navigation;
