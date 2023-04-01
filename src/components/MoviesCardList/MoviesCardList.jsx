import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ onCardLike, onCardDelete, showedCards }) => {
  return (
    <section className="movies">
      <div className="movies__container">
        {showedCards ?
      (showedCards.length > 0
        ? (showedCards.map(item => (
          <MoviesCard
            key={item.id}
            card={item}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        )))
        : <span className="movies__span">Ничего не найдено</span>
      ) : <></>}
      </div>
    </section>
  )
}

export default MoviesCardList
