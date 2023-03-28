import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import { useEffect } from 'react';
import React from 'react';
import "./Movies.css";

const Movies = (props) => {
  useEffect(() => props.reset(), []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleClickButtonMore() {
    props.onRenderMovies(props.filteredSavedCards, props.showedCards, props.countCardsShow.more);
  }

  const moviesCardList = () =>
    <>
      <MoviesCardList
        showedCards={props.showedCards}
        onCardDelete={props.onCardDelete}
        onCardLike={props.onCardLike}
        savedCards={props.savedCards} />
      {props.filteredSavedCards > 0 && props.showedCards > 0 && <ButtonMore handleClick={handleClickButtonMore} />}
    </>

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
        onLoad={props.onLoad}
        isChecked={props.isChecked}
        onCheck={props.onCheck}
      />
      {
        props.isLoading ? <Preloader /> :
          props.showedCards.length > 0 ? moviesCardList() : <span className="movies__span">Ничего не найдено</span>
      }
    </section>
  )
}

export default Movies
