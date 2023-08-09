import photo from '../../../images/me__photo.jpg'

function Me() {

    return (
        <section className='me' id='me'>
            <h2 className='me__title'>Студент</h2>
            <div className='me__columns'>
                <div className='me__column'>
                <h3 className='me__name'>Вера Чащина</h3>
                <h4 className='me__about'>Фронтенд-разработчик, 25 лет</h4>
                <p className='me__text'>Переехала в&nbsp;Санкт-Петербург в 2018 году, получила медицинское образование и потом моя жизнь изменилась - я&nbsp;влюбилась
                    в&nbsp;веб-разработку. Мне нравится создавать пользовательские интерфейсы, делать их функциональными и удобными.</p>
                <a className='me_link' href='https://github.com/chashchinavera' target='_blank' rel='noopener noreferrer'>Github</a>
            </div>
            <img className='me__photo' alt='Фото создателя этой страницы' src={photo}/>
            </div>
        </section>
    )
}

export default Me;
