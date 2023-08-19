import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi.js';
import * as Authorisation from '../Auth/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProctectedRoute from '../ProctectedRoute/ProctectedRoute.js'
import { MOVIE_DURATION_SHORT } from '../../config/config';

function App() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);

    const [formRegisterValue, setFormRegisterValue] = useState({
        email: '',
        password: '',
    });

    const [formLoginValue, setFormLoginValue] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const loggedIn = localStorage.getItem('loggedIn');

    function signOut() {
        localStorage.clear('jwt', 'loggedIn', 'allMovies', 'movies', 'switchOnButton', 'request');
        navigate('/signin');
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
                    localStorage.setItem('jwt', res.jwt);
                    setFormLoginValue({ email: '', password: '' });
                    setEmail(formLoginValue.email);
                    localStorage.setItem('loggedIn', true)
                    navigate('/');
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                console.log(err);
            });
    }

    useEffect(() => {
        if (jwt && loggedIn) {
            Authorisation.checkToken(jwt)
                .then(() => {
                    Promise.all([mainApi.getUserData(jwt), mainApi.getInitialCards(jwt)])
                        .then(([currentUser, savedMovies]) => {
                            setCurrentUser(currentUser);
                            setSavedMovies(savedMovies);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn, jwt]);

    function handleUpdateUser(data) {
        mainApi.sendUserData(data, jwt)
            .then((data) => {
                const { name, email } = data;
                setCurrentUser({ ...currentUser, name: name, email: email });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function filterMovies(movies, request) {
        const moviesRequest = movies.filter((movie) => {
            const movieRu = String(movie.nameRU).toLowerCase().trim();
            const movieEn = String(movie.nameEN).toLowerCase().trim();
            const requestMovies = request.toLowerCase().trim();
            return movieRu.indexOf(requestMovies) !== -1 || movieEn.indexOf(requestMovies) !== -1;
        });
        return moviesRequest;
    }

    function filterDuration(movies) {
        return movies.filter((movie) => movie.duration < MOVIE_DURATION_SHORT);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
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
                                element={Movies}
                                loggedIn={loggedIn}
                                filterMovies={filterMovies}
                                filterDuration={filterDuration}
                            />
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={
                            <ProctectedRoute
                                element={SavedMovies}
                                loggedIn={loggedIn}
                                savedMovies={savedMovies}
                            />
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProctectedRoute
                                element={Profile}
                                loggedIn={loggedIn}
                                onSignOut={signOut}
                                email={email}
                                setEmail={setEmail}
                                onUpdateUser={handleUpdateUser}
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
