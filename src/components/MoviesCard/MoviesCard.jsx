import { paths } from '../../utils/config';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, onCardDelete, onCardLike }) => {
  const [isLiked, setIsLiked] = useState(card.isLiked);

  let location = useLocation();

  const cardLikeButtonClassName = `movies-card__button ${isLiked ? "movies-card__button_active" : ""}`;

  function getTimeFromMins(mins) {
    if (mins >= 60) {
      return `${Math.floor(mins / 60)} ч  ${mins % 60} м`
    }
    return `${mins} м`;
  }

  function handleLikeClick() {
    onCardLike(card).then(() => setIsLiked(card.isLiked));
  }

  function handleDeleteClick() {
    onCardDelete(
      card,
      location.pathname === paths.savedMovies)
      .then(() => setIsLiked(card.isLiked));
  }

  const image =
    <img
      className="movies-card__image"
      src={card.imageUrl}
      alt={card.name} />

  return (
    <article className="movies-card">
      {card.trailerLink.trim() ? (
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="movies-card__link">{image}</a>) : (image)}

      <div className="movies-card__container">
        <div className="movies-card__text">
          <p className="movies-card__title">{card.nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMins(card.duration)}</p>
        </div>
        {location.pathname === paths.movies ? (
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={isLiked ? handleDeleteClick : handleLikeClick}
          />
        ) : (
          <button
            type="button"
            className="movies-card__button movies-card__button_delete"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </article >
  )
}

export default MoviesCard
