import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ moviesArray, savedMovies }) => {
  return (
    <section className="movies">
      <div className="movies__container">
      {moviesArray.map(item => (
          <MoviesCard id={item.id} movie={item} savedMovies={savedMovies} isLiked={true}/>
        ))}
      </div>
    </section>
  )
}

export default MoviesCardList
