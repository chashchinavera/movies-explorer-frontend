function Project() {

    return (
        <section className='project' id="project">
            <h3 className='project__title'>О проекте</h3>
            <div className='project__about'>
                <div>
                    <h4 className='project__subtitle'>Дипломный проект включал 5 этапов</h4>
                    <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div >
                    <h4 className='project__subtitle'>На выполнение диплома ушло 5 недель</h4>
                    <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='project__plan'>
                <p className='project__period'>1 неделя</p>
                <p className='project__period'>4 недели</p>
                <p className='project__caption'>Back-end</p>
                <p className='project__caption'>Front-end</p>
            </div>
        </section>
    )
}

export default Project;
