import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMoviesList from '../SavedMoviesList/SavedMoviesList';
import SearchForm from "../SearchForm/SearchForm";
import { savedCards } from '../../utils/constants';

function SavedMovies({ loggedIn }) {

    return (
        <div className='movies'>
            <Header
                loggedIn={loggedIn}
                theme={{ short: false }}
            />
            <main>
                <SearchForm />
                <SavedMoviesList
                    cards={savedCards}
                />
            </main>
            <Footer />
        </div>
    )
}

export default SavedMovies;