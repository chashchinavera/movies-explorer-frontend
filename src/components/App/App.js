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
import * as Authorisation from '../Auth/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProctectedRoute from '../ProctectedRoute/ProctectedRoute.js'

function App() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);

    const [formRegisterValue, setFormRegisterValue] = useState({
        email: "",
        password: "",
    });

    const [formLoginValue, setFormLoginValue] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const jwt = localStorage.getItem('userId');

    function handleTokenCheck() {
        if (jwt) {
            Authorisation.checkToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.email);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    }

    function handleSignOut() {
        localStorage.clear('userId');
        navigate('/signin');
        setLoggedIn(false);
        console.log(currentUser);
    }

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        Authorisation.register(formRegisterValue.name, formRegisterValue.email, formRegisterValue.password)
            .then(() => {
                navigate('/signin');
                setFormRegisterValue({ name: '', email: '', password: '' });
                setIsSuccess(true);
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            })
            .finally(() => setErrorMessage(true));
    }

    function handleLoginSubmit(evt) {
        evt.preventDefault();
        Authorisation.login(formLoginValue.email, formLoginValue.password)
            .then((res) => {
                if (res.jwt) {
                    localStorage.setItem('userId', res.jwt);
                    setFormLoginValue({ email: '', password: '' });
                    setEmail(formLoginValue.email);
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            });
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserData(jwt)])
                .then(([currentUser]) => {
                    setCurrentUser(currentUser);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Main
                                loggedIn={loggedIn}
                            />
                        }
                    />
                    <Route
                        path='/movies'
                        element={
                            <ProctectedRoute
                                element={<Movies
                                    loggedIn={loggedIn}
                                />}
                            />
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={
                            <ProctectedRoute
                                element={<SavedMovies
                                    loggedIn={loggedIn}
                                />}
                            />
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProctectedRoute
                                element={<Profile
                                    loggedIn={loggedIn}
                                />}
                            />
                        }
                    />
                    <Route
                        path='/signin'
                        element={<Login
                            onLogin={handleLoginSubmit}
                            formLoginValue={formLoginValue}
                            setFormLoginValue={setFormLoginValue}
                        />}
                    />
                    <Route
                        path='/signup'
                        element={<Register
                            onRegister={handleRegisterSubmit}
                            formRegisterValue={formRegisterValue}
                            setFormRegisterValue={setFormRegisterValue}
                            isSuccess={isSuccess}
                            errorMessage={errorMessage}
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
