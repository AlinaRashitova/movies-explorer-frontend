import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ onCardLike, onCardDelete, showedCards }) => {
  return (
    <section className="movies">
      <div className="movies__container">
        {showedCards.map(item => (
          <MoviesCard
            key={item.id}
            card={item}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </section>
  )
}

export default MoviesCardList

