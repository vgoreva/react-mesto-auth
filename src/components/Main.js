import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button
                    className="profile__change-avatar-button"
                    type="button"
                    aria-label="Изменить автар"
                    onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar ? currentUser.avatar : '#'}
                        alt="Аватар профиля" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
                    <p className="profile__details">{currentUser.about ? currentUser.about : ''}</p>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Изменить данные пользователя"
                        onClick={onEditProfile}>
                    </button>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace}>
                </button>
            </section>
            <section className="locations">
                <ul className="location__elements">
                    {cards.map(data => {
                        return (
                            <li className="element" key={data._id}>
                                <Card card={data} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main