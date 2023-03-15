import "./Greeting.css";

const Greeting = ({ text }) => {
  return (
    <div className="greeting">
      <p className="greeting__title">{text}</p>
    </div>
  )
}

export default Greeting
