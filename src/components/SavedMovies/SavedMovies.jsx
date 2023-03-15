import { savedMoviesArray } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
      />
      <MoviesCardList moviesArray={savedMoviesArray} savedMovies={true}/>
    </div>
  )
}

export default SavedMovies
