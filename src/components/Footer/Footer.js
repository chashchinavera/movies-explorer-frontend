function Footer() {

    return (
        <footer className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__signboard'>
                <p className='footer__year'>&copy; 2023</p>
                <div className='footer__sources'>
                    <a className='footer__source'
                    href='https://practicum.yandex.ru'
                    target='_blank'
                    rel='noopener noreferrer'
                    >Яндекс.Практикум</a>
                    <a className='footer__source'
                        href='https://github.com/chashchinavera'
                        target='_blank'
                        rel='noopener noreferrer'>Github</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;