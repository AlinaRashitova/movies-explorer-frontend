import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useState } from "react";

const SearchForm = (props) => {
  const [searchInput, setSearchInput] = useState('');


  function handleChangeSearch(e) {
    setSearchInput(e.target.value);
    if (props.onChangeSearchInput) {
      props.onChangeSearchInput(e.target.value);
    }

    if (props.onChangeSavedSearchInput) {
      props.onChangeSavedSearchInput(e.target.value);
    }

  }

  function handleSubmit(e, string) {
    e.preventDefault();
    if (props.onLoad) {
      if (props.loadedCards.length === 0) {
        props.onLoad(string);
      } else {
        props.onFilter(props.loadedCards, string);
      }
    } else {
      props.onFilterSaved(props.savedCards, string)
    }
  }

  return (
    <form className="search" onSubmit={(e) => {handleSubmit(e, searchInput)}} noValidate>
      <fieldset className="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder={props.placeholder}
          name="movie"
          minLength="2"
          required
          value={searchInput}
          onChange={handleChangeSearch}
        />
        <button
          className="search__button"
          type="submit">
          {props.buttonName}
        </button>
      </fieldset>
      <FilterCheckbox
        label="Короткометражки"
        check={props.check}
        onCheck={props.onCheck}
      />
    </form>
  )
}

export default SearchForm
