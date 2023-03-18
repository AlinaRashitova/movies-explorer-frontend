import './Burger.css';

const Burger = ({ isMenuOpen, handleToggleMenu }) => {
  return (
    <button className={`burger ${isMenuOpen && 'burger_active'}`}
      onClick={handleToggleMenu}>
      <span className="burger__span"></span>
      <span className="burger__span"></span>
      <span className="burger__span"></span>
    </button>
  )
}

export default Burger



