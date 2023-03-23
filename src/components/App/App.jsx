import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { paths, messages } from "../../utils/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./App.css";

import AuthorizedComponent from "../AuthorizedComponent/AuthorizedComponent";
import UnauthorizedComponent from "../UnauthorizedComponent/UnauthorizedComponent";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import {
  register,
  login,
  checkToken,
  getUserInfo,
  editUserInfo,
  addMovie,
  getMovies,
  deleteMovie
} from "../../utils/MainApi";

const App = () => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [loadedMovies, setLoadedMovies] = useState([]);

  // Состояние чекбокса SearchForm
  const [isChecked, setIsChecked] = useState(false);

  // Пустой результат поиска
  const [nothingShow, setNothingShow] = useState(false);

  // Состояние строки поиска в SavedMovies
  const [savedSearchInput, setSavedSearchInput] = useState('');

  // Состояние ширины вьюпорта и количество карточек для рендера
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [countMoviesShow, setCountMoviesShow] = useState({});

  //Состояние ответа сервера на запросы к MainApi
  const [responseError, setResponseError] = useState({});

  const isHeaderVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies) ||
    (location.pathname === paths.profile);

  const isFooterVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies);

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo()
        .then(user => setCurrentUser(user))
        .catch(err => console.log(err))
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleCheckLogin();
    window.addEventListener('resize', () => {
      setTimeout(setWindowWidth(window.innerWidth), 2000)
    });
    return () => {
      window.removeEventListener('resize', () => {
        setTimeout(setWindowWidth(window.innerWidth), 2000)
      });
    }
  }, []);

  useEffect(() => {
    if (windowWidth >= 1200) {
      setCountMoviesShow({ renderMovies: 16, moreMovies: 4 });
    } else if (windowWidth > 900 && window.innerWidth < 1200) {
      setCountMoviesShow({ renderMovies: 12, moreMovies: 3 });
    } else if (windowWidth > 600 && window.innerWidth < 900) {
      setCountMoviesShow({ renderMovies: 8, moreMovies: 2 });
    } else {
      setCountMoviesShow({ renderMovies: 5, moreMovies: 2 });
    }
  }, [windowWidth]);

  function resetNothingShow() {
    setNothingShow(false);
  }

  function changeSavedSearchInput(value) {
    setSavedSearchInput(value);
  }

  // Загрузка карточек с MoviesApi
  function loadMovies(string, check) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        setLoadedMovies(res);
        filterMovie(res, string, check);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }

  // Фильтр карточек на Movies
  function filterMovie(arr, string) {
    const str = string.toLowerCase();
    const regExp = new RegExp(`${str}`, 'g');
    let movies = [];
    movies = arr.filter((card) => {
      return (String(movie.nameRU).toLowerCase().match(regExp) ||
        String(movie.nameEN).toLowerCase().match(regExp) ||
        String(movie.director).toLowerCase().match(regExp));
    })
    if (movies.length === 0) {
      setNothingShow(true);
      setShowedMovies([]);
    } else {
      setNothingShow(false);
      localStorage.setItem('filteredMovies', JSON.stringify(movies));
      if (isChecked) {
        const movies = JSON.parse(localStorage.filteredMovies).filter((item) => item.duration < 40);
        setShowedMovies(movies);
      } else {
        renderMovies(movies, [], countMoviesShow.show);
      }
    }
  }

  // Фильтр карточек на SavedMovies
  function filterSavedMovie(arr, string) {
    const str = string.toLowerCase();
    const regExp = new RegExp(`${str}`, 'g');
    let movies = [];
    movies = arr.filter((card) => {
      return (String(movie.nameRU).toLowerCase().match(regExp) ||
        String(movie.nameEN).toLowerCase().match(regExp) ||
        String(movie.director).toLowerCase().match(regExp));
    })
    if (movies.length === 0) {
      setNothingShow(true);
    } else {
      setNothingShow(false);
      setFilteredSavedMovies(movies);
    }
  }


  function handleRegister(data) {
    register(data.email, data.name, data.password)
      .then(() => {
        handleLogin(data.email, data.password)
      })
      .catch((err) => {
        if (err.indexOf === 409) {
          setResponseError({ error: messages.emailError });
        } else {
          setResponseError({ error: messages.registrationError });
        }
      })
  }

  function handleLogin(email, password) {
    login(email, password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        if (err.indexOf === 401) {
          setResponseError({ error: messages.loginError });
        } else {
          setResponseError({ error: messages.registrationError });
        }
      })
  }

  function handleEditUserInfo(data) {
    editUserInfo(data)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        getSavedMovies();
        setResponseError({ message: messages.successMessage });
      })
      .catch((err) => {
        if (err.indexOf === 409) {
          setResponseError({ error: messages.emailError });
        } else {
          setResponseError({ error: messages.registrationError });
        }
      })
  }

  function handleCheckLogin() {
    setIsAuthChecked(true);
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsAuthChecked(false));
    } else {
      setIsAuthChecked(false);
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function resetResponseErrors() {
    setResponseError('');
  }

  function getSavedMovies() {
    getMovies()
      .then((res) => {
        const movies = res.filter(
          (item => item.owner === currentUser._id)
        )
        setSavedMovies(movies)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function deleteMovie(id) {
    deleteMovie(id)
      .then((res) => {
        const movies = savedMovies.filter((movie) => movie._id !== id);
        setSavedMovies(movies);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="app">
      <div className="app__container">
        <CurrentUserContext.Provider value={currentUser}>
          {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}

          <main>
            <Routes>
              <Route path={paths.main} element={<Main />} />

              <Route
                path={paths.movies}
                element={
                  <AuthorizedComponent
                    isLoggedIn={isLoggedIn}
                    component={<Movies
                      onSubmit={loadMovies}
                      isLoading={isLoading}
                      onDelete={deleteMovie}
                      filteredMovies={filteredMovies}
                      showedMovies={showedMovies}
                      countMovies={countMoviesShow}
                      loadedMovies={loadedMovies}
                      savedMovies={savedMovies}
                      /*onRenderMovies={renderMovies}
                      onLoad={onLoad}
                      onSave={onSave}*/
                      onFilter={filterMovie}
                      isAuthChecked={isAuthChecked}
                      check={isChecked}
                      nothingShow={nothingShow}
                      resetNothingShow={resetNothingShow}
                      onChangeSavedSearchInput={changeSavedSearchInput}
                    />}
                    pathToRedirect={paths.main}
                  />
                }
              />

              <Route
                path={paths.savedMovies}
                element={
                  <AuthorizedComponent
                    isLoggedIn={isLoggedIn}
                    component={<SavedMovies
                      isLoading={isLoading}
                      onDelete={deleteMovie}
                    />}
                    pathToRedirect={paths.main}
                  />
                }
              />

              <Route
                path={paths.profile}
                element={
                  <AuthorizedComponent
                    isLoggedIn={isLoggedIn}
                    component={<Profile
                      logOut={handleLogOut}
                      isLoggedIn={isLoggedIn}
                      isAuthChecked={isAuthChecked}
                      onEditInfo={handleEditUserInfo}
                      responseError={responseError}
                      resetResponseErrors={resetResponseErrors}
                    />}
                    pathToRedirect={paths.main}
                  />
                }
              />

              <Route
                path={paths.signIn}
                element={
                  <UnauthorizedComponent
                    isLoggedIn={isLoggedIn}
                    component={<Login
                      signIn={handleLogin}
                      responseError={responseError}
                      resetResponseErrors={resetResponseErrors}
                    />}
                    pathToRedirect={paths.movies}
                  />
                }
              />

              <Route
                path={paths.signUp}
                element={
                  <UnauthorizedComponent
                    isLoggedIn={isLoggedIn}
                    component={<Register
                      signUpn={handleRegister}
                      responseError={responseError}
                      resetResponseErrors={resetResponseErrors}
                    />}
                    pathToRedirect={paths.movies}
                  />
                }
              />

              <Route path="*" element={<PageNotFound />} />

            </Routes>
          </main>

          {isFooterVisible && <Footer />}
        </CurrentUserContext.Provider>
      </div>
    </div>
  )
}

export default App;
