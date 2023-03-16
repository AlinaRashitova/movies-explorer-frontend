import { useState } from "react";
import Logo from "../Logo/Logo";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

const Header = ({ loggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((state) => !state);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const headerClassName = loggedIn ? 'header header__logged-in' : 'header';

  return (
    <header className={headerClassName}>
      <div className={`header__overlay ${isMenuOpen && 'header__overlay_opened'}`} />
      <Logo />
      <Navigation
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        handleCloseMenu={handleCloseMenu} />
      {loggedIn && <Burger isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />}
    </header>
  )
}

export default Header


/*import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../utils/config";
import Logo from "../Logo/Logo";
import account from "../../images/account.svg";

import './Header.css'


export default function Header({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const headerClassName = `header ${(location.pathname === paths.main) ? 'header_main' : ''}`;
  let headerContainerClassName = 'header__container header__container_hidden';
  if (loggedIn) headerContainerClassName += ' header__container_loggedIn';
  if (isMenuOpen) headerContainerClassName += ' header__container_opened';

  let headerOverlayName = 'header__overlay';
  if (isMenuOpen) headerOverlayName += ' header__overlay_opened';

  const handleToggleMenu = () => setIsMenuOpen((state) => !state);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className={headerClassName}>
      <div
        className={headerOverlayName}
        onClick={handleCloseMenu}
      />
      <Logo />
      {loggedIn && <nav className={headerContainerClassName}>
        {isMenuOpen &&
          <Link
            className={`header__link ${location.pathname === paths.main && 'header__link_active'}`}
            to={paths.main}>
            Главная
          </Link>}
        <Link
          className={`header__link ${location.pathname === paths.movies && 'header__link_active'}`}
          to={paths.movies}>
          Фильмы
        </Link>
        <Link className={`header__link ${location.pathname === paths.savedMovies && 'header__link_active'}`}
          to={paths.savedMovies}>
          Сохраненные фильмы
        </Link>
        <Link className={`header__link header__link_profile ${location.pathname === paths.profile && 'header__link_active'}`}
          to={paths.profile}>
          <img src={account} alt="Профиль" />
          Аккаунт
        </Link>
      </nav>}
      {!loggedIn && <nav className="header__container">
        <Link className="header__link_small-text header__link" to="/sign-up">Регистрация</Link>
        <Link className="header__link_small-text header__link header__link_green " to="/sign-in">Войти</Link>
      </nav>}
      {loggedIn && <button className={`header__btn-menu ${isMenuOpen && 'header__btn-menu_active'}`}
        onClick={handleToggleMenu}>
        <span className="header__span"></span>
        <span className="header__span"></span>
        <span className="header__span"></span>
      </button>}
    </header>
  );
}
*/
