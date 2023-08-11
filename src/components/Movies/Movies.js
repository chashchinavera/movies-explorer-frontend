import { useEffect, useState } from 'react';
import Header from '../Header/Header';

function Movies() {

    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <div className='movies'>
            <Header 
            loggedIn={loggedIn}
            />
        </div>
    )
}

export default Movies;
