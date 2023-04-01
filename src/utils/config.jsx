export const paths = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signUp: '/signup',
  signIn: '/signin',
}

export const messages = {
  loginError: 'Неправильно указан email или пароль',
  registerError: 'При регистрации пользователя произошла ошибка',
  editUserInfoError: 'При обновлении профиля произошла ошибка',
  successMessage: 'Данные успешно обновлены',
  emailError: 'Пользователь с таким email уже существует',
  failedError: 'Что-то пошло не так...',
  cardLikeError: 'Фильм не удалось добавить в сохраненные',
  cardDeleteError: 'Не удалось удалить фильм из сохраненных',
  loadMoviesError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

//export const MAIN_URL = 'http://localhost:3000';
export const MAIN_URL = 'https://api.movie.alinarashitova.nomoredomains.work';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

