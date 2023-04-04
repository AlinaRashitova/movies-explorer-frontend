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

  // Состояние количества показываемых карточек
  const [showedCards, setShowedCards] = useState();
  const [allCards, setAllCards] = useState([]);

  // Состояние количества карточек для рендера при нажатии кнопки "Еще"
  const [countCardsAddMore, setCountCardsAddMore] = useState();

  const [countCardsInitialLoad, setCountCardsInitialLoad] = useState();

  // Состояние ответа сервера на запросы к MainApi
  const [responseMessage, setResponseMessage] = useState({});


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
        .then(user => {
          setCurrentUser(user);
          setResponseMessage({});
        })
        .catch(() => setResponseMessage({ error: messages.failedError }))
    }
  }, [isLoggedIn]);

  function adaptCountCards() {
    if (window.innerWidth < 750) {
      setCountCardsAddMore(2);
      setCountCardsInitialLoad(5);
    } else if (window.innerWidth < 1030) {
      setCountCardsAddMore(2);
      setCountCardsInitialLoad(8);
    } else if (window.innerWidth < 1290) {
      setCountCardsAddMore(3);
      setCountCardsInitialLoad(12);
    } else {
      setCountCardsAddMore(4);
      setCountCardsInitialLoad(12);
    }
  }

  let timeOutHandler;

  function onResize() {
    clearTimeout(timeOutHandler);
    timeOutHandler = setTimeout(adaptCountCards, 2000);
  }

  useEffect(() => {
    handleCheckToken();
    window.addEventListener('resize', onResize);
    adaptCountCards();
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleRegister(data) {
    register(data.name, data.password, data.email)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(data.email, data.password);
          setResponseMessage({});
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setResponseMessage({ error: messages.emailError });
        } else {
          setResponseMessage({ error: messages.registerError });
        }
      })
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          setResponseMessage({});
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setResponseMessage({ error: messages.loginError });
        } else {
          setResponseMessage({ error: messages.registerError });
        }
      })
  }

  function handleEditUserInfo(data) {
    editUserInfo(data)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setResponseMessage({ message: messages.successMessage });
      })
      .catch((err) => {
        if (err.status === 409) {
          setResponseMessage({ error: messages.emailError });
        } else {
          setResponseMessage({ error: messages.editUserInfoError });
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
          setResponseMessage({});
        })
        .catch(() => setResponseMessage({ error: messages.failedError }));
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialValues');
    setShowedCards([]);
  }

  function handleCardLike(card) {
    return addCard(card)
      .then((res) => {
        card.isLiked = true;
        card.savedMovieId = res._id;
        setResponseMessage({});
      })
      .catch(() => setResponseMessage({ error: messages.cardLikeError }));
  }

  function handleCardDelete(card, deleteCard) {
    return deleteMovie(card.savedMovieId)
      .then(() => {
        if (deleteCard) {
          setShowedCards(showedCards.filter(element => element !== card));
        } else {
          card.isLiked = false;
        }
        setResponseMessage({});
      })
      .catch(() => setResponseMessage({ error: messages.cardDeleteError }));
  }

  // Загрузка карточек с MoviesApi
  function loadMovies(string, onlyShortMovies) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        getMovies()
          .then((savedMoviesArr) => {
            setIsLoading(false);
            const movies = filterMovie(res.map((obj) => {
              const likedMovie = savedMoviesArr.find(item => item.movieId === obj.id);
              return {
                ...obj,
                imageUrl: "https://api.nomoreparties.co" + obj.image.url,
                ...(likedMovie) && { isLiked: true, savedMovieId: likedMovie._id }
              }
            }), string, onlyShortMovies);
            localStorage.setItem("initialValues", JSON.stringify({
              searchStringInitial: string,
              isCheckedInitial: onlyShortMovies,
              moviesInitial: movies
            }))
          })
          .catch((e) => { throw e })
        setResponseMessage({});
      }
      )
      .catch(() => {
        setIsLoading(false);
        setResponseMessage({ error: messages.loadMoviesError });
      })
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
        setResponseMessage({});
      })
      .catch(() => {
        setIsLoading(false);
        setResponseMessage({ error: messages.loadMoviesError });
      })
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
    if (movies.length === 0 && !string) {
      setShowedCards(undefined)
    } else {
      sliceCards(movies)
    }
    return movies;
  }

  function sliceCards(movies) {
    setShowedCards(movies.slice(0, countCardsInitialLoad));
    setAllCards(movies);
  }

  function reset() {
    setShowedCards(undefined);
    setResponseMessage({});
  }

  function renderMovies() {
    if (allCards.length > countCardsAddMore) {
      setShowedCards(allCards.slice(0, showedCards.length + countCardsAddMore));
    }
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
                      allCards={allCards}
                      onRenderMovies={renderMovies}
                      showedCards={showedCards}
                      setShowedCards={setShowedCards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      sliceCards={sliceCards}
                      responseMessage={responseMessage}
                    />}
                    pathToRedirect={paths.movies}
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
                      showedCards={showedCards}
                      onCardDelete={handleCardDelete}
                      responseMessage={responseMessage}
                    />}
                    pathToRedirect={paths.savedMovies}
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
                      responseMessage={responseMessage}
                      reset={reset}
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
                      responseMessage={responseMessage}
                      reset={reset}
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
                      responseMessage={responseMessage}
                      reset={reset}
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
