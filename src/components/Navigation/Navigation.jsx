import "./Navigation.css";
import account from "../../images/account.svg";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../utils/config";

const Navigation = ({ loggedIn, isMenuOpen }) => {
  const location = useLocation();

  const navigationClassName = `navigation__container ${loggedIn && 'navigation__container_logged-in'}
  navigation__container_hidden ${isMenuOpen && 'navigation__container_opened'}`;

  const links = !loggedIn ? (
    <>
      <Link className="navigation__link navigation__link_signup" to={paths.signUp}>Регистрация</Link>
      <Link className="navigation__link navigation__link_signin" to={paths.signIn}>Войти</Link>
    </>
  ) : (
    <>
      {isMenuOpen &&
        <Link
          className={`navigation__link ${location.pathname === paths.main && 'navigation__link_active'}`}
          to={paths.main}>
          Главная
        </Link>}
      <Link
        className={`navigation__link ${location.pathname === paths.movies && 'navigation__link_active'}`}
        to={paths.movies}>
        Фильмы
      </Link>
      <Link className={`navigation__link ${location.pathname === paths.savedMovies && 'navigation__link_active'}`}
        to={paths.savedMovies}>
        Сохраненные фильмы
      </Link>
      <Link className={`navigation__link navigation__link_profile ${location.pathname === paths.profile && 'navigation__link_active'}`}
        to={paths.profile}>
        <img src={account} alt="Профиль" />
        Аккаунт
      </Link>
    </>
  )

  return (
    <nav className={navigationClassName}>
      {links}
    </nav >
  )
}

export default Navigation




