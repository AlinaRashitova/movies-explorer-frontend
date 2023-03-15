import "./FilterCheckbox.css";

const FilterCheckbox = ({ label }) => {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
        />
      </label>
      <p className="checkbox__text">{label}</p>
    </div>
  )
}

export default FilterCheckbox
