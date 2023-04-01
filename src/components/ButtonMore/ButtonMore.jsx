import "./ButtonMore.css";

const ButtonMore = ({ handleClick }) => {
  return (
    <button className="button-more" onClick={handleClick}>
      Ещё
    </button>
  )
}

export default ButtonMore
