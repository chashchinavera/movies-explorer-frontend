import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import Project from '../Main/Project/Project';
import Techs from './Techs/Techs';
import Me from './Me/Me';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {

    return (
        <div className="main">
            <Header theme={{ short: false }} />
            <main>
                <Promo />
                <Project />
                <Techs />
                <Me />
                <Portfolio />
            </main>
            <Footer />
        </div>
    )
}

export default Main;
