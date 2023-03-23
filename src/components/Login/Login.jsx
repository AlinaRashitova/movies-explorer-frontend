import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import { useValidationForm } from "../../utils/hooks/useValidationForm";

const Login = (props) => {
  const {values, errors, isValid, handleChange } = useValidationForm();

  useEffect(() => {
    props.resetResponseErrors();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.resetResponseErrors();
    if (props.signUp) {
      props.signUp(values);
    } else {
      props.signIn(values.email, values.password);
    }
  }

  return (
    <div className="login">
      <Logo />
      <Greeting text="Рады видеть!" />
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label className="login__form_label">
          E-mail
        </label>
        <input
          className="login__form_input"
          type="email"
          required
          autoComplete="on"
          name="email"
          placeholder="Введите email"
          id="profile-email"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="login__form_error">{errors.email || ''}</span>
        <label className="login__form_label">
          Пароль
        </label>
        <input
          className="login__form_input"
          type="password"
          required
          minLength="4"
          maxLength="10"
          autoComplete="on"
          name="password"
          placeholder="Введите пароль"
          id="profile-password"
          value={values.password}
          onChange={handleChange}
        />
       <span className="login__form_error">{errors.password || ''}</span>
        <button
          className="login__form_button"
          disabled={!isValid}
          type='submit'
        >
          Войти
        </button>
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
