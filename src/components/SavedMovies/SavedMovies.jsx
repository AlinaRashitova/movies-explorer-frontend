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
        responseMessage={props.responseMessage}
      />
      {props.isLoading
        ? <Preloader />
        : moviesSavedCardList()
      }
    </section>
  )
}

export default SavedMovies
