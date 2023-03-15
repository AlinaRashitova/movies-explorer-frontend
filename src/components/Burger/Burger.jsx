import './Burger.css';

const Burger = ({ isMenuOpen, handleToggleMenu }) => {
  return (
    <button className={`header__burger ${isMenuOpen && 'header__burger_active'}`}
      onClick={handleToggleMenu}>
      <span className="header__burger_span"></span>
      <span className="header__burger_span"></span>
      <span className="header__burger_span"></span>
    </button>
  )
}

export default Burger



