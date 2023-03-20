import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle"

const Techs = () => {
  return (
    <section className="techs" id="techs">
        <SectionTitle title="Технологии" />
      <div className="techs__description">
        <p className="techs__description_title">7&nbsp;технологий</p>
        <p className="techs__description_text">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__list_item">
          <a
            href="https://www.w3schools.com/html/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            HTML
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://www.w3schools.com/css/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            CSS
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://www.w3schools.com/js/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            JS
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://reactjs.org/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://github.com/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            Git
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://expressjs.com/ru/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            Express.js
          </a>
        </li>
        <li className="techs__list_item">
          <a
            href="https://www.mongodb.com/"
            className="techs__link"
            target="_blank"
            rel="noreferrer"
          >
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Techs
