import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

import { moviesArray } from "../../utils/constants";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SearchForm
        placeholder="Фильм"
        buttonName="Найти"
      />
      {isLoading
      ? <Preloader />
      : <MoviesCardList moviesArray={moviesArray} savedMovies={false} />}
    </>
  )
}

export default Movies
