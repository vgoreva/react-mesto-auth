function InfoTooltip ({name, result, isOpen, onClose}) {
return (
<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClose={onClose} onClick={onClose}>
            <div className={`popup__container popup__container_type_${name}`} onClick={(evt => evt.stopPropagation())}>
                <div className={`popup__icon ${!result ? "popup__icon_type_error" : ""}`} />
                <h2 className={`popup__title popup__title_type_${name} `}>{!result ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</h2>
                <button
                    className="popup__close-button"
                    type="reset"
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                </button>
            </div>
        </div>
)
}

export default InfoTooltip