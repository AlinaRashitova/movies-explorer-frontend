import "./FilterCheckbox.css";

const FilterCheckbox = ({ label, isChecked, onCheck, name }) => {
  return (
    <fieldset className="checkbox">
        <input
        className="checkbox__input"
        type="checkbox"
        checked={isChecked}
        onChange={onCheck}
        name={name}
        />
      <p className="checkbox__text">{label}</p>
    </fieldset>
  )
}

export default FilterCheckbox
