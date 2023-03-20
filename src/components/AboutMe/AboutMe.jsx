import './AboutMe.css';
import studentPhoto from '../../images/studentPhoto.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section className="student" id="about-me">
        <SectionTitle title="Студент" />
      <div className="student__info">
        <img
          src={studentPhoto}
          alt="student"
          className="student__photo"
        />
        <div className="student__info_text">
          <p className="student__info_name">Алина</p>
          <p className="student__info_status">Фронтенд-разработчик, 28 лет</p>
          <p className="student__info_description">
          Меня заинтересовала frontend-разработка, потому что мне нравится разрабатывать интерфейс, делать его максимально дружественным для пользователя, а&nbsp;также видеть результат своей работы.
С&nbsp;ноября 2021&nbsp;г. изучаю web-разработку: окончила курс на&nbsp;английском языке &laquo;Web Design for Everybody&raquo; на&nbsp;платформе Coursera, на&nbsp;данный момент прохожу курс &laquo;Веб-разработчик&raquo; от&nbsp;Яндекс Практикума.
Свои знания повышаю чтением профессиональной литературы, просмотром вебинаров и&nbsp;видео на&nbsp;YouTube по&nbsp;web-разработке.
Раньше работала в&nbsp;многочисленном коллективе, что научило меня легко находить общий язык с&nbsp;разными людьми. За&nbsp;счет работы с&nbsp;большим количеством информации я&nbsp;умею анализировать данные и&nbsp;выделять важное.
          </p>
        </div>
        <a
          href="https://github.com/AlinaRashitova"
          className="student__info_link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
      <Portfolio />
    </section>
  )
}

export default AboutMe;
