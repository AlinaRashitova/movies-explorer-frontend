import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import Input from "../Input/Input";

const Register = () => {
  return (
    <div className="register">
      <Logo />
      <Greeting text="Добро пожаловать!" />
      <form className="register__form">
        <Input
          required={true}
          autoComplete="on"
          name="name"
          placeholder="Введите имя"
          id="profile-name"
          label="Имя"
        />
        <Input
          required={true}
          autoComplete="on"
          name="email"
          placeholder="Введите email"
          id="profile-email"
          label="E-mail"
        />
        <Input
          required={true}
          autoComplete="on"
          name="password"
          placeholder="Введите пароль"
          id="profile-password"
          label="Пароль"
        />
        <span className="register__form_error"></span>
        <button className="register__form_button">Зарегистрироваться</button>
        <p className="register__form_caption">
          Уже зарегистрированы?
          <Link
            className="register__form_link"
            to="/signin"
          >
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register

