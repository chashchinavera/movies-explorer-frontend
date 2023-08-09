import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import Project from '../Main/Project/Project';
import Techs from './Techs/Techs';
import Me from './Me/Me';
import Portfolio from './Portfolio/Portfolio';

function Main() {

    return (
        <main className="main">
            <Header />
            <Promo />
            <Project />
            <Techs />
            <Me />
            <Portfolio />
        </main>
    )
}

export default Main;
