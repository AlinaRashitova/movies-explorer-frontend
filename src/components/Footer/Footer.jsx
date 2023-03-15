import "./Footer.css";

const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
        <nav className="footer__navigation">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/AlinaRashitova"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </nav>
        <p className="footer__year">&copy; {currentYear}</p>
    </footer>
  )
}

export default Footer;
