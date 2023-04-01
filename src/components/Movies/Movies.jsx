import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import { useEffect, useState } from 'react';
import React from 'react';

const Movies = (props) => {
  const [isCheckedInitial, setIsCheckedInitial] = useState(false);
  const [searchStringInitial, setSearchStringInitial] = useState('');

  useEffect(() => {
    props.reset()
    const initialValues = JSON.parse(localStorage.getItem("initialValues"));
    if (initialValues) {
      setSearchStringInitial(initialValues.searchStringInitial);
      setIsCheckedInitial(initialValues.isCheckedInitial);
      props.sliceCards(initialValues.moviesInitial)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleClickButtonMore() {
    props.onRenderMovies();
  }

  const moviesCardList = () =>
    <>
      <MoviesCardList
        showedCards={props.showedCards}
        onCardDelete={props.onCardDelete}
        onCardLike={props.onCardLike}
        savedCards={props.savedCards}
      />
      {(props.showedCards && props.showedCards.length < props.allCards.length) && <ButtonMore handleClick={handleClickButtonMore} />}
    </>

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
        onLoad={props.onLoad}
        isCheckedInitial={isCheckedInitial}
        searchStringInitial={searchStringInitial}
        responseMessage={props.responseMessage}
      />
      {
        props.isLoading
          ? <Preloader />
          : moviesCardList()
      }
    </section>
  )
}

export default Movies
