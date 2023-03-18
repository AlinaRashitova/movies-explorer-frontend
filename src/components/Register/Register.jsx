import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import Greeting from "../Greeting/Greeting";
import Input from "../Input/Input";
import { useState, useEffect } from "react";
import { messages, emailRegExp } from "../../utils/config";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState(messages.emailInputError);
  const [passwordError, setPasswordError] = useState(messages.passwordInputError);
  const [nameError, setNameError] = useState(messages.nameInputError);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError, nameError])


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

  const nameHandler = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 2) {
      setNameError(messages.nameInputError)
      if (!e.target.value) {
        setNameError(messages.nameInputError)
      }
    } else {
      setNameError('')
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
      case 'name':
        setNameDirty(true);
        break;
      default:
    }
  }

  return (
    <div className="register">
      <Logo />
      <Greeting text="Добро пожаловать!" />
      <form className="register__form" noValidate>
        <Input
          type="text"
          required={true}
          autoComplete="on"
          name="name"
          minLength="2"
          maxLength="20"
          placeholder="Введите имя"
          id="profile-name"
          label="Имя"
          value={name}
          onBlur={e => blurHandler(e)}
          onChange={e => nameHandler(e)}
        />
        {(nameDirty && nameError) && <span className="register__form_error">{nameError}</span>}
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
        {(emailDirty && emailError) && <span className="register__form_error">{emailError}</span>}
        <Input
          type="password"
          required={true}
          autoComplete="on"
          name="password"
          minLength="4"
          maxLength="10"
          placeholder="Введите пароль"
          id="profile-password"
          label="Пароль"
          value={password}
          onBlur={e => blurHandler(e)}
          onChange={e => passwordHandler(e)}
        />
        {(passwordDirty && passwordError) && <span className="register__form_error">{passwordError}</span>}
        <button
          className="register__form_button"
          disabled={!formValid}
          type='submit'
        >
          Зарегистрироваться
        </button>
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

