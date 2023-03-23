import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import { useEffect } from 'react';

import { moviesArray } from "../../utils/constants";

const Movies = (props) => {

  useEffect(() => {
    props.resetNothingShow();
    props.onChangeSavedSearchInput("");
  }, [])

  function handleClickButtonMore() {
    props.onRenderMovies(props.filteredMovies, props.showedMovies, props.countMovies.more);
  }

  return (
    <>
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
      />
      {props.isLoading
        ? <Preloader />
        :
        <>
          <MoviesCardList
            moviesArray={moviesArray}
            savedMovies={false}
          />
          {props.filteredMovies.length > 0 && props.showedMovies.length > 0 && !props.nothingShow &&
          <ButtonMore handleClick={handleClickButtonMore}/>}
        </>
      }
    </>
  )
}

export default Movies
