import './Portfolio.css';
import linkLogo from '../../images/link.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__links">
        <li className="portfolio__links_item">
          <a
            href="https://github.com/AlinaRashitova/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <img src={linkLogo} alt="Ссылка" className="portfolio__link_logo"/>
        </li>
        <li className="portfolio__links_item">
          <a
            href="https://github.com/AlinaRashitova/russian-travel"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <img src={linkLogo} alt="Ссылка" className="portfolio__link_logo"/>
        </li>
        <li className="portfolio__links_item">
          <a
            href="https://github.com/AlinaRashitova/react-mesto-api-full"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <img src={linkLogo} alt="Ссылка" className="portfolio__link_logo"/>
        </li>
      </ul>

    </section>
  )
}

export default Portfolio
