import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import Input from "../Input/Input";

const Login = () => {
  return (
    <div className="login">
      <Logo />
      <Greeting text="Рады видеть!" />
      <form className="login__form">
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
        <span className="login__form_error"></span>
        <button className="login__form_button">Войти</button>
        <p className="login__form_caption">
          Ещё не зарегистрированы?
          <Link
            className="login__form_link"
            to="/signup"
          >
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
