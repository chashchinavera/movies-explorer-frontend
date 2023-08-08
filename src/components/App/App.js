import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';

function App() {

    return (
        <Routes>
            <Route
                path='/'
                element={<Main/>}
            />
            <Route
                path='/movies'
            />
            <Route
                path='/saved-movies'
            />
            <Route
                path='/profile'
            />
            <Route
                path='/signin'
            />
            <Route
                path='/signup'
            />
        </Routes>
    )
}

export default App;
