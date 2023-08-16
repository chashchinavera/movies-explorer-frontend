import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import api from '../../utils/Api.js';
import * as Authorisation from './../Auth/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {

    const [isSuccess, setIsSuccess] = useState(false);

    const [formRegisterValue, setFormRegisterValue] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        Authorisation.register(formRegisterValue.email, formRegisterValue.password)
            .then(() => {
                navigate('/signin');
                setFormRegisterValue({ email: '', password: '' });
                setIsSuccess(true);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            })
    }

    return (
        <CurrentUserContext.Provider>
            <div className="page">
                <Routes>
                    <Route
                        path='/'
                        element={<Main />}
                    />
                    <Route
                        path='/movies'
                        element={<Movies />}
                    />
                    <Route
                        path='/saved-movies'
                        element={<SavedMovies />}
                    />
                    <Route
                        path='/profile'
                        element={<Profile />}
                    />
                    <Route
                        path='/signin'
                        element={<Login />}
                    />
                    <Route
                        path='/signup'
                        element={<Register
                            onRegister={handleRegisterSubmit}
                            formRegisterValue={formRegisterValue}
                            setFormRegisterValue={setFormRegisterValue}
                        />}
                    />
                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
