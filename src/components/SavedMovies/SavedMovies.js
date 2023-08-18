import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesList from '../SavedMoviesList/SavedMoviesList';
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ loggedIn, switchOnButtonSave, setSwitchOnButtonSave, savedMovies, formSearchMovie, setFormSearchMovie }) {

    return (
        <div className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <main>
                <SearchForm
                    switchOnButtonSave={switchOnButtonSave}
                    setSwitchOnButtonSave={setSwitchOnButtonSave}
                    formSearchMovie={formSearchMovie}
                    setFormSearchMovie={setFormSearchMovie}
                />
                <SavedMoviesList
                    cards={savedMovies}
                />
            </main>
            <Footer />
        </div>
    )
}

export default SavedMovies;