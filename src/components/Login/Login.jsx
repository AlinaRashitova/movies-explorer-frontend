import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useEffect, useState } from "react";
import { messages, emailRegExp } from "../../utils/config";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(messages.emailInputError);
  const [passwordError, setPasswordError] = useState(messages.passwordInputError);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    if (!emailRegExp.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError(messages.emailInputError)
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      setPasswordError(messages.passwordInputError)
      if (!e.target.value) {
        setPasswordError(messages.passwordInputError)
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
    }
  }

  return (
    <div className="login">
      <Logo />
      <Greeting text="Рады видеть!" />
      <form className="login__form" noValidate>
        <Input
          type="email"
          required={true}
          autoComplete="on"
          name="email"
          placeholder="Введите email"
          id="profile-email"
          label="E-mail"
          value={email}
          onBlur={e => blurHandler(e)}
          onChange={e => emailHandler(e)}
        />
        {(emailDirty && emailError) && <span className="login__form_error">{emailError}</span>}
        <Input
          type="password"
          required={true}
          minLength="4"
          maxLength="10"
          autoComplete="on"
          name="password"
          placeholder="Введите пароль"
          id="profile-password"
          label="Пароль"
          value={password}
          onBlur={e => blurHandler(e)}
          onChange={e => passwordHandler(e)}
        />
        {(passwordDirty && passwordError) && <span className="login__form_error">{passwordError}</span>}
        <button
          className="login__form_button"
          disabled={!formValid}
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
