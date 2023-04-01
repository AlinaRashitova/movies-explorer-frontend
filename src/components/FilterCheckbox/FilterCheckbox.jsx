import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
  function handleClick(e) {
    props.setIsChecked(e.target.checked);
  }

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        className={`checkbox__input ${props.isChecked && "checkbox__input_active"}`}
        name="shorts"
        id="shortMovies"
        onClick={handleClick}
      />
      <label htmlFor="shortMovies" className="checkbox__label">{props.label}</label>
    </div>
  )
}

export default FilterCheckbox;
