import { MOVIES_URL } from "./config";

export const checkResponse = (res) => {
  return res.ok ? res.json : Promise.reject(`Ошибка: ${res.status}`);
}

class MoviesApi {
  getMovies() {
   return fetch(`${MOVIES_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(checkResponse);
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;

