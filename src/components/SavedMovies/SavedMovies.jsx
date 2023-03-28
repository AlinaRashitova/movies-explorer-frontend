import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { useEffect } from "react";

const SavedMovies = (props) => {
  useEffect(() => {
    props.reset();
    props.onLoad();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const moviesSavedCardList = () =>
    <>
      <MoviesCardList
        savedCards={props.savedCards}
        showedCards={props.showedCards}
        onCardDelete={props.onCardDelete}
      />
    </>

  return (
    <section className="saved-movies">
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
        onLoad={props.onLoad}
        isChecked={props.isChecked}
        onCheck={props.onCheck}
      />
      {props.isLoading ? <Preloader /> :
        props.showedCards.length > 0 ? moviesSavedCardList() : <span className="saved-movies__span">Ничего не найдено</span>}
    </section>
  )
}

export default SavedMovies
