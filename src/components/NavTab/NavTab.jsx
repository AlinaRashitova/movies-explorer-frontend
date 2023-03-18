import "./NavTab.css";

const NavTab = () => {
  return (
    <section className="project-nav">
      <nav>
        <ul className="project-nav__links-list">
          <li className="project-nav__links-item">
            <a href="#about-project" className="project-nav__link">О&nbsp;проекте</a>
          </li>
          <li className="project-nav__links-item">
            <a href="#techs" className="project-nav__link">Технологии</a>
          </li>
          <li className="project-nav__links-item">
            <a href="#about-me" className="project-nav__link">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default NavTab
