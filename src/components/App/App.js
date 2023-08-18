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
import moviesApi from '../../utils/MoviesApi';
import * as Authorisation from '../Auth/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProctectedRoute from '../ProctectedRoute/ProctectedRoute.js'

function App() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [switchOnButton, setSwitchOnButton] = useState(false);
    const [switchOnButtonSave, setSwitchOnButtonSave] = useState(false);

    const [formRegisterValue, setFormRegisterValue] = useState({
        email: '',
        password: '',
    });

    const [formLoginValue, setFormLoginValue] = useState({
        email: '',
        password: '',
    });

    const [formSearchMovie, setFormSearchMovie] = useState({
        request: '',
    });

    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const loggedIn = localStorage.getItem('loggedIn');

    function signOut() {
        localStorage.clear();
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
                    Promise.all([mainApi.getUserData(jwt), mainApi.getInitialCards(jwt), moviesApi.getMovies(jwt)])
                        .then(([currentUser, savedMovies, movies]) => {
                            setCurrentUser(currentUser);
                            setSavedMovies(savedMovies);
                            setMovies(movies)
                            console.log(movies);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn, jwt]);

    function handleUpdateUser(data) {
        // setIsLoading(true);
        mainApi.sendUserData(data, jwt)
            .then((data) => {
                const { name, email } = data;
                setCurrentUser({ ...currentUser, name: name, email: email });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                // setIsLoading(false);
            });
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
                                movies={movies}
                                switchOnButton={switchOnButton}
                                setSwitchOnButton={setSwitchOnButton}
                                formSearchMovie={formSearchMovie}
                                setFormSearchMovie={setFormSearchMovie}
                            />
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={
                            <ProctectedRoute
                                element={SavedMovies}
                                loggedIn={loggedIn}
                                switchOnButtonSave={switchOnButtonSave}
                                setSwitchOnButtonSave={setSwitchOnButtonSave}
                                savedMovies={savedMovies}
                                formSearchMovie={formSearchMovie}
                                setFormSearchMovie={setFormSearchMovie}
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
