import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import useFormValidation from '../../hooks/useFormValidation';

function App() {

    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successText, setSuccessText] = useState('');
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
    const { resetForm, values, errors, isValid, handleChange, setValues } = useFormValidation();

    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const loggedIn = localStorage.getItem('loggedIn');

    const hideMessage = () => {
        setTimeout(() => {
            setIsOpenInfoTooltip(false);
            setSuccessText('');
        }, 1000);
    };

    function signOut() {
        localStorage.clear('jwt', 'loggedIn', 'allMovies', 'movies', 'switchOnButton', 'request');
        navigate('/signin');
        resetForm();
        console.log(currentUser);
    }

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        Authorisation.register(values.name, values.email, values.password)
            .then((res) => {
                resetForm();
                handleLoginSubmit(evt);
                setIsSuccess(true);
                setSuccessText('Вы успешно зарегистрированы')
                setIsOpenInfoTooltip(true);
                hideMessage();
            })
            .catch((err) => {
                console.log(err);
                setIsOpenInfoTooltip(true);
                hideMessage();
            })

    }

    function handleLoginSubmit(evt) {
        evt.preventDefault();
        Authorisation.login(values.email, values.password)
            .then((res) => {
                if (res.jwt) {
                    localStorage.setItem('jwt', res.jwt);
                    localStorage.setItem('loggedIn', true)
                    navigate('/movies');
                }
            })
            .catch((err) => {
                console.log(err);
                setIsOpenInfoTooltip(true);
                hideMessage();
            });
    }

    useEffect(() => {
        if (jwt && loggedIn) {
            Authorisation.checkToken(jwt)
            Promise.all([mainApi.getUserData(jwt), mainApi.getInitialCards(jwt)])
                .then(([currentUser, savedMovies]) => {
                    setCurrentUser(currentUser);
                    setSavedMovies(savedMovies.reverse());
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [jwt, loggedIn]);

    function handleUpdateUser(data) {
        mainApi.sendUserData(data, jwt)
            .then((data) => {
                const { name, email } = data;
                setCurrentUser({ ...currentUser, name: name, email: email });
                setIsSuccess(true);
                setSuccessText('Данные пользователя успешно изменены')
                setIsOpenInfoTooltip(true);
                hideMessage();
            })
            .catch((err) => {
                console.log(err);
                setIsOpenInfoTooltip(true);
                hideMessage();
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

    function handleMovieSave(data) {
        mainApi.saveMovie(data, jwt)
            .then((result) => {
                setSavedMovies([result, ...savedMovies]);
                setIsSuccess(true);
                setSuccessText('Фильм сохранен')
                setIsOpenInfoTooltip(true);
                hideMessage();
            })
            .catch((err) => {
                console.log(err);
                console.log(jwt, data)
                setIsOpenInfoTooltip(true);
                hideMessage();
            })
    }

    function handleMovieDelete(data) {
        mainApi.deleteMovie(data._id, jwt)
            .then(() => {
                setSavedMovies((state) => state.filter((card) => card !== data));
                setIsSuccess(true);
                setSuccessText('Фильм удален')
                setIsOpenInfoTooltip(true);
                hideMessage();
            })
            .catch((err) => {
                console.log(err)
                setIsOpenInfoTooltip(true);
                hideMessage();
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
                                filterMovies={filterMovies}
                                filterDuration={filterDuration}
                                onSave={handleMovieSave}
                                onDelete={handleMovieDelete}
                                savedMovies={savedMovies}
                                setIsOpenInfoTooltip={setIsOpenInfoTooltip}
                                hideMessage={hideMessage}
                            />
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={
                            <ProctectedRoute
                                element={SavedMovies}
                                loggedIn={loggedIn}
                                filterMovies={filterMovies}
                                filterDuration={filterDuration}
                                savedMovies={savedMovies}
                                onSave={handleMovieSave}
                                onDelete={handleMovieDelete}
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
                                onUpdateUser={handleUpdateUser}
                                values={values}
                                setValues={setValues}
                                errors={errors}
                                handleChange={handleChange}
                                isValid={isValid}
                            />
                        }
                    />
                    <Route
                        path='/signin'
                        element={!loggedIn ?
                            <Login
                                onLogin={handleLoginSubmit}
                                values={values}
                                errors={errors}
                                isValid={isValid}
                                handleChange={handleChange}
                            />
                            :
                            <Navigate to='/movies' />}
                    />
                    <Route
                        path='/signup'
                        element={!loggedIn ?
                            <Register
                                onRegister={handleRegisterSubmit}
                                values={values}
                                errors={errors}
                                isValid={isValid}
                                handleChange={handleChange}
                            />
                            :
                            <Navigate to='/movies' />}
                    />
                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
            </div>
            <InfoTooltip
                isOpenInfoTooltip={isOpenInfoTooltip}
                isSuccess={isSuccess}
                successText={successText}
                errorText={'Что-то пошло не так! Попробуйте ещё раз.'}
            />
        </CurrentUserContext.Provider>
    )
}

export default App;
