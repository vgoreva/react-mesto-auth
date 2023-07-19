import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {
    const [linkFormError, setLinkFormError] = useState(" ");

    const inputLink = useRef(null)

    useEffect(() => {
        inputLink.current.value = "";
        setLinkFormError(" ")
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({ avatar: inputLink.current.value });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSend={isSend} >
            <input
                className="popup__input popup__input_type_avatar"
                type="url"
                name="avatar"
                id="avatar"
                ref={inputLink}
                onChange={evt => setLinkFormError(evt.target.validationMessage || " ")}
                placeholder="Сcылка на картинку"
                required="" />
            <span className="popup__error" id="avatar-error">{linkFormError}</span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup
