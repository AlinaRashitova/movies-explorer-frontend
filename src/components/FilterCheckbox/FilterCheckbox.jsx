import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
  return (
    <fieldset className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        name="shorts"
        onChange={e => props.onChange(e.target.checked)}
      />
      <p className="checkbox__text">{props.label}</p>
    </fieldset>
  )
}

export default FilterCheckbox
