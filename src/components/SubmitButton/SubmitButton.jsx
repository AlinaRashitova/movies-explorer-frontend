import './SubmitButton.css';

const SubmitButton = ({ text, isActive }) => {
  const buttonClassName = isActive ? 'submit-button' : 'submit-button submit-button__disabled'
  return (
    <button
      className={buttonClassName}
      disabled={!isActive}
    >
      {text}
    </button>
  )
}

export default SubmitButton
