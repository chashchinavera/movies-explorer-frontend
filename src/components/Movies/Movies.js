import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {

    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <div className='movies'>
            <Header 
            loggedIn={loggedIn}
            />
            <SearchForm />
        </div>
    )
}

export default Movies;
