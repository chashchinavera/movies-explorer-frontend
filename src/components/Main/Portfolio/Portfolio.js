function Portfolio() {

    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li>
                    <a className='portfolio__site' href='https://github.com/chashchinavera/how-to-learn' target='_blank'
            rel='noopener noreferrer'>Статичный сайт
                        <button className='portfolio__button' aria-label='Ссылка на статичный сайт' type='button' />
                    </a>
                </li>
                <li>
                    <a className='portfolio__site' href='https://github.com/chashchinavera/russian-travel' target='_blank'
            rel='noopener noreferrer'>Адаптивный сайт
                        <button className='portfolio__button' aria-label='Ссылка на адаптивный сайт' type='button' />
                    </a>
                </li>
                <li>
                    <a className='portfolio__site portfolio__site_last' href='https://github.com/chashchinavera/react-mesto-api-full-gha' target='_blank'
            rel='noopener noreferrer'>Одностраничное приложение
                        <button className='portfolio__button' aria-label='Ссылка на одностраничное приложение' type='button' />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;
