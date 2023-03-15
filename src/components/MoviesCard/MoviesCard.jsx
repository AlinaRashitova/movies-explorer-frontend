import './MoviesCard.css';

const MoviesCard = ({ movie, isLiked, savedMovies }) => {
  return (
    <article className="movie">
      <img
        className="movie__image"
        src={movie.image}
        alt="Постер" />
      <div className="movie__container">
        <p className="movie__title">{movie.nameRU}</p>
        <button
          className={`movie__button
          ${isLiked ? 'movie__button_liked' : ''}
          ${savedMovies ? 'movie__button_saved' : ''}`}
          type="button">
        </button>
      </div>
      <p className="movie__duration">{movie.duration}</p>
    </article>
  )
}

export default MoviesCard
