import "./ButtonMore.css";

const ButtonMore = ({ handleCLick }) => {
  return (
    <button className="button-more" onClick={handleCLick}>
      Ещё
    </button>
  )
}

export default ButtonMore
