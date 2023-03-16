export const paths = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signUp: '/signup',
  signIn: '/signin',
}

export const messages = {
  emailInputError: 'Введите корректный email',
  nameInputError: 'Имя должно содержать минимум 2 символа',
  passwordInputError: 'Пароль должен содержать минимум 4 символа',
  inputError: 'Что-то пошло не так...',
}

export const nameRegExp = / ^[A-zА-яё\s-]{2,30}$/
export const passwordRegExp = / ^.{4,30}$ /;
export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

