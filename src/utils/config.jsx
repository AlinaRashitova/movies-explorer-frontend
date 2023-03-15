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
}

export const nameRegExp = / ^[A-zА-яё\s-]{2,30}$/
export const passwordRegExp = / ^.{4,30}$ /;

