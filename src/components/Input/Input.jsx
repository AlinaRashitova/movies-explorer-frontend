import "./Input.css";

const Input = (props) => {
  return (
    <fieldset className="input">
      <label
        htmlFor={props.id}
        className="input__label"
      >
        {props.label}
      </label>
      <input type={props.type}
        className="input__field"
        required={props.required}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
      />
      <span className="input__message">{props.validationMessage}</span>
    </fieldset>
  )
}

export default Input
