function ImagePopup({card, isOpen, onClose}) {
    return (
        <div className={`popup popup_type_view  ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__container popup__container_image" onClick={(evt => evt.stopPropagation())}>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}>
                </button>
                <div className="popup__template">
                    <img className="popup__image" src={card.link ? card.link : "#"} alt={card.name ? card.name : "#"} />
                    <h2 className="popup__title popup__title_full">{card.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup