import { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";
import { paths } from "../../utils/config";

const Header = ({ isLoggedIn }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((state) => !state);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const headerClassName = (location.pathname === paths.main) ? 'header' : 'header header_logged-in';

  return (
    <header className={headerClassName}>
      <div className={`header__overlay ${isMenuOpen && 'header__overlay_opened'}`} />
      <Logo />
      <Navigation
        loggedIn={isLoggedIn}
        isMenuOpen={isMenuOpen}
        handleCloseMenu={handleCloseMenu} />
      {isLoggedIn && <Burger isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />}
    </header>
  )
}

export default Header
