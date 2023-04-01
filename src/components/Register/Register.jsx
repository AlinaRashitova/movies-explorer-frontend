import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import { useEffect } from "react";
import { useValidationForm } from "../../utils/hooks/useValidationForm";


const Register = (props) => {
  const { values, errors, isValid, handleChange } = useValidationForm();

  useEffect(() => {
    props.reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    props.reset();
    props.signUp(values);
  }
  return (
    <div className="register">
      <Logo />
      <Greeting text="Добро пожаловать!" />
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <label className="register-form__label">
          Имя
        </label>
        <input
          className="register-form__input"
          type="text"
          required
          autoComplete="on"
          name="name"
          minLength="2"
          maxLength="30"
          pattern="[а-яА-Яёa-zA-Z\s-]{2,30}"
          placeholder="Введите имя"
          id="name"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="register-form__error">{errors.name || ''}</span>
        <label className="register-form__label">
          E-mail
        </label>
        <input
          className="register-form__input"
          type="email"
          required
          autoComplete="on"
          name="email"
          placeholder="Введите email"
          id="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="register-form__error">{errors.email || ''}</span>
        <label className="register-form__label">
          Пароль
        </label>
        <input
          className="register-form__input"
          type="password"
          required
          autoComplete="on"
          name="password"
          minLength="4"
          maxLength="10"
          placeholder="Введите пароль"
          id="password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="register-form__error">{errors.password || ''}</span>
        <div className="register-form__container">
          <span className={`register-form__response-error ${props.responseMessage.message && "register-form__response-message"}`}>
            {props.responseMessage.error}
          </span>
          <button
            className="register-form__button"
            disabled={!isValid}
            type='submit'
          >
            Зарегистрироваться
          </button>
          <p className="register-form__caption">
            Уже зарегистрированы?
            <Link
              className="register-form__link"
              to="/signin"
            >
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register

