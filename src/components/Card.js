import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    return (
        <div className="element__container">
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick({ link: card.link, name: card.name })}
            />
            <h2 className="element__title">{card.name}</h2>
            {isOwn &&
                <button
                    className="element__trash-button"
                    type="button"
                    aria-label="Удалить"
                    id="trash"
                    onClick={() => onCardDelete(card._id )}
                >
                </button>}
            <button
                className={`element__like-button ${isLiked && 'element__like_button_active'}`}
                type="button"
                aria-label="Нравится"
                id="like"
                onClick={() => onCardLike(card)}
            >
            </button>
            <span className="element__counter">{card.likes.length}</span>
        </div>
    )
}

export default Card;