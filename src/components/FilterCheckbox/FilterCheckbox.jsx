import "./FilterCheckbox.css";

const FilterCheckbox = ({ label }) => {
  return (
    <fieldset className="checkbox">
        <input className="checkbox__input" type="checkbox" />
      <p className="checkbox__text">{label}</p>
    </fieldset>
  )
}

export default FilterCheckbox
