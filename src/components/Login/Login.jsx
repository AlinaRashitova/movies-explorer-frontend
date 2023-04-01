import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import { useValidationForm } from "../../utils/hooks/useValidationForm";

const Login = (props) => {
  const { values, errors, isValid, handleChange } = useValidationForm();

  useEffect(() => {
    props.reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    props.reset();
    props.signIn(values.email, values.password);
  }

  return (
    <div className="login">
      <Logo />
      <Greeting text="Рады видеть!" />
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label className="login-form__label">
          E-mail
        </label>
        <input
          className="login-form__input"
          type="email"
          required
          autoComplete="on"
          name="email"
          placeholder="Введите email"
          id="profile-email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="login-form__error">{errors.email || ''}</span>
        <label className="login-form__label">
          Пароль
        </label>
        <input
          className="login-form__input"
          type="password"
          required
          minLength="4"
          maxLength="10"
          autoComplete="on"
          name="password"
          placeholder="Введите пароль"
          id="profile-password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="login-form__error">{errors.password || ''}</span>
        <div className="login-form__container">
          <span className={`login-form__response-error ${props.responseMessage.message && "login-form__response-message"}`}>
            {props.responseMessage.error}
          </span>
          <button
            className="login-form__button"
            disabled={!isValid}
            type='submit'
          >
            Войти
          </button>
          <p className="login-form__caption">
            Ещё не зарегистрированы?
            <Link
              className="login-form__link"
              to="/signup"
            >
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
