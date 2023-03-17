import "./PageNotFound.css";
import { Link } from "react-router-dom";
import { paths } from "../../utils/config";

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <div className="page-not-found__info">
        <p className="page-not-found__title">404</p>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <Link
        to={paths.signIn}
        className="page-not-found__link"
      >
        Назад
      </Link>
    </section>
  )
}

export default PageNotFound
