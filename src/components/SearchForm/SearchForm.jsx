import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

const SearchForm = ({ placeholder, buttonName }) => {
  return (
    <div className="search">
      <form className="search__form" noValidate>
        <input
          className="search__input"
          type="text"
          placeholder={placeholder}
          name="movie"
          required
        />
        <button className="search__button">{buttonName}</button>
      </form>
      <FilterCheckbox label="Короткометражки" />
    </div>
  )
}

export default SearchForm
