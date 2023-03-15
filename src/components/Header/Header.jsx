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
      <div
        className={`header__overlay ${isMenuOpen && 'header__overlay_opened'}`}
        onClick={handleCloseMenu}
      />
      <Logo />
      <Navigation
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen} />
      {loggedIn && <Burger isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />}
    </header>
  )
}

export default Header
