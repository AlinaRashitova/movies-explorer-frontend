import { MAIN_URL } from "./config";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Users
export const register = (name, password, email) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
};

export const login = (email, password) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUserInfo = () => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse);
};

export const editUserInfo = (data) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
    .then(checkResponse);
}

// Movies
export const addCard = (inputValues) => {
  return fetch(`${MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      country: inputValues.country,
      director: inputValues.director,
      duration: inputValues.duration,
      year: inputValues.year,
      description: inputValues.description,
      image: "https://api.nomoreparties.co/" + inputValues.image.url,
      trailerLink: inputValues.trailerLink,
      thumbnail: "https://api.nomoreparties.co/" + inputValues.image.url,
      movieId: String(inputValues.id),
      nameRU: inputValues.nameRU,
      nameEN: inputValues.nameEN,
    })
  })
    .then(checkResponse);
}

export const getMovies = () => {
  return fetch(`${MAIN_URL}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse);
}

export const deleteMovie = (movieId) => {
  return fetch(`${MAIN_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse);
};
