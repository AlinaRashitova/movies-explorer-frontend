import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const AboutProject = () => {
  return (
    <section className="project" id="about-project">
        <SectionTitle title="О проекте" />
      <ul className="project__list">
        <li className="project__list_item">
          <p className="project__list_subtitle">Дипломный проект включал 5&nbsp;этапов</p>
          <p className="project__list_text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="project__list_item">
          <p className="project__list_subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</p>
          <p className="project__list_text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__time-line">
        <p className="project__stage-time project__stage-time_backend">1 неделя</p>
        <p className="project__stage-time project__stage-time_frontend">4 недели</p>
        <p className="project__stage-title project__stage-title_backend">Backend</p>
        <p className="project__stage-title project__stage-title_frontend">Frontend</p>
      </div>
    </section>
  );
}

export default AboutProject;
