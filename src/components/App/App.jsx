import { Route, Routes, useLocation } from "react-router-dom";

import { paths } from "../../utils/config";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const location = useLocation();

  const isHeaderVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies) ||
    (location.pathname === paths.profile);

  const isFooterVisible = (location.pathname === paths.main) ||
    (location.pathname === paths.movies) ||
    (location.pathname === paths.savedMovies);

  return (
    <div className="app">
      <div className="app__container">
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}

        <main>
          <Routes>
            <Route path={paths.main} element={<Main />} />

            <Route path={paths.movies} element={<Movies />} />

            <Route path={paths.savedMovies} element={<SavedMovies />} />

            <Route path={paths.profile} element={<Profile />} />

            <Route path={paths.signIn} element={<Login />} />

            <Route path={paths.signUp} element={<Register />} />

            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </main>

        {isFooterVisible && <Footer />}
      </div>
    </div>
  )
}

export default App;
