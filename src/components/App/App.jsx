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
  addCard,
  getMovies,
  deleteMovie
} from "../../utils/MainApi";

const App = () => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showedCards, setShowedCards] = useState([]);
  const [countCardsShow, setCountCardsShow] = useState({});

  // Состояние ширины вьюпорта и количество карточек для рендера
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Состояние ответа сервера на запросы к MainApi
  const [responseError, setResponseError] = useState("");


  const isHeaderVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies) ||
    (location.pathname === paths.profile);

  const isFooterVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies);

  useEffect(() => {
    handleCheckToken()
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo()
        .then(user => setCurrentUser(user))
        .catch(err => console.log(err))
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleCheckToken();
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
      setCountCardsShow({ renderMovies: 16, moreMovies: 4 });
    } else if (windowWidth > 900 && window.innerWidth < 1200) {
      setCountCardsShow({ renderMovies: 12, moreMovies: 3 });
    } else if (windowWidth > 600 && window.innerWidth < 900) {
      setCountCardsShow({ renderMovies: 8, moreMovies: 2 });
    } else {
      setCountCardsShow({ renderMovies: 5, moreMovies: 2 });
    }
  }, [windowWidth]);

  function handleRegister(data) {
    register(data.name, data.password, data.email)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(data.email, data.password)
        }
      })
      .catch(() => setResponseError(messages.failedError))
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          setResponseError("");
        }
      })
      .catch(() => setResponseError(messages.failedError))
  }

  function handleEditUserInfo(data) {
    editUserInfo(data)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setResponseError(messages.successMessage);
      })
      .catch((err) => {
        if (err.status === 409) {
          setResponseError(messages.emailError);
        } else {
          setResponseError(messages.editUserInfoError);
        }
      })
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch(err => console.log(err))
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setShowedCards([]);
  }

  function handleCardLike(card) {
    return addCard(card)
      .then((res) => {
        card.isLiked = true;
        card.savedMovieId = res._id;
      })
      .catch(err => console.log(err));
  }

  // Загрузка карточек с MoviesApi
  function loadMovies(string, onlyShortMovies) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        setIsLoading(false);
        getMovies()
          .then((savedMoviesArr) => {
            filterMovie(res.map((obj) => {
              const likedMovie = savedMoviesArr.find(item => item.movieId === obj.id);
              return {
                ...obj,
                imageUrl: "https://api.nomoreparties.co" + obj.image.url,
                ...(likedMovie) && { isLiked: true, savedMovieId: likedMovie._id }
              }
            }), string, onlyShortMovies);
          })
      })
      .catch(err => console.log(err));
  }

  function loadSavedMovies(string, onlyShortMovies) {
    setIsLoading(true);
    getMovies()
      .then((res) => {
        filterMovie(res.map(obj => (
          { ...obj, id: obj.movieId, imageUrl: obj.image, isLiked: true, savedMovieId: obj._id })),
          string,
          onlyShortMovies);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }

  // Фильтр карточек на Movies
  function filterMovie(arr, string, onlyShortMovies) {
    let cardMatchesSearch = () => true
    if (string) {
      const str = string.toLowerCase();
      const regExp = new RegExp(`${str}`, 'g');
      cardMatchesSearch = (card) => (
        regExp.test(String(card.nameRU).toLowerCase()) ||
        regExp.test(String(card.nameEN).toLowerCase()) ||
        regExp.test(String(card.director).toLowerCase())
      );
    }
    let movies = [];
    movies = arr.filter((card) => {
      return (cardMatchesSearch(card) && (!onlyShortMovies || card.duration <= 40));
    })
    setShowedCards(movies);
  }

  function resetResponseErrors() {
    setResponseError("");
  }

  function reset() {
    setShowedCards([]);
  }

  function handleCardDelete(card, deleteCard) {
    return deleteMovie(card.savedMovieId)
      .then(() => {
        if (deleteCard) {
          setShowedCards(showedCards.filter(element => element !== card));
        } else {
          card.isLiked = false;
        }
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
                      isLoading={isLoading}
                      onLoad={loadMovies}
                      reset={reset}
                      countCards={countCardsShow}
                      showedCards={showedCards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
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
                      onLoad={loadSavedMovies}
                      reset={reset}
                      countCards={countCardsShow}
                      showedCards={showedCards}
                      onCardDelete={handleCardDelete}
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
                      signUp={handleRegister}
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
