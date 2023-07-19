function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose, onSubmit, isSend }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className={`popup__container popup__container_type_${name}`} onClick={(evt => evt.stopPropagation())}>
                <h2 className={`popup__title popup__title_type_${name}`} >{title}</h2>
                <form className="popup__form" name={`form_type_${name}`} noValidate="" onSubmit={onSubmit}>
                <button
                    className="popup__close-button"
                    type="reset"
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                </button>
                    {children}
                    <button className={`popup__save-button popup__save-button_type_${name}`} type="submit">{isSend ? '...' : buttonTitle || "Сохранить"}</button>
                </form>
            </div>
        </div>
    )

}

export default PopupWithForm