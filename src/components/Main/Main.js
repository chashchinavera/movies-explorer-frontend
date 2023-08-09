import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import Project from '../Main/Project/Project';
import Techs from './Techs/Techs';

function Main() {

    return (
        <main className="main">
            <Header />
            <Promo />
            <Project />
            <Techs />
        </main>
    )
}

export default Main;
