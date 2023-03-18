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
      <input
        type={props.type}
        className="input__field"
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      <span className="input__message">{props.validationMessage}</span>
    </fieldset>
  )
}

export default Input
