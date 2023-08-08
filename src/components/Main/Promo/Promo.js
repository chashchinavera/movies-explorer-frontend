import { Link } from 'react-router-dom';

function Promo() {
    return (
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <div className='promo__links'>
            <Link to='#' className='promo__button'>О проекте</Link>
            <Link to='#' className='promo__button'>Технологии</Link>
            <Link to='#' className='promo__button'>Студент</Link>
            </div>
        </section>
    )
}

export default Promo;