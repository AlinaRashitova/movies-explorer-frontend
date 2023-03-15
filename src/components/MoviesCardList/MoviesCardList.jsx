import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ moviesArray, savedMovies }) => {
  return (
    <section className="movies">
        {moviesArray.map(item => (
          <MoviesCard id={item.id} movie={item} savedMovies={savedMovies} isLiked={true}/>
        ))}
      {!savedMovies && <button className="movies__button">Ещё</button>}
    </section>
  )
}

export default MoviesCardList
