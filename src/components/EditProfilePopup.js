import { useState, useContext, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [nameFormError, setNameFormError] = useState(" ");
    const [descriptionFormError, setDescriptionFormError] = useState(" ");

    const currentUser = useContext(CurrentUserContext);

    const inputs =
        [{
            type: "text",
            minLength: 2,
            maxLength: 40,
            name: "name",
            id: "name",
            placeholder: "Ваше имя",
            required: true,
            value: name || " ",
            onChange: evt => {
                setName(evt.target.value);
                setNameFormError(evt.target.validationMessage || " ")
            },
            errorMesage: nameFormError,
            key: 1
        },
        {
            type: "text",
            minLength: 2,
            maxLength: 200,
            name: "description",
            id: "description",
            placeholder: "О себе",
            required: true,
            value: description || " ",
            onChange: evt => {
                setDescription(evt.target.value);
                setDescriptionFormError(evt.target.validationMessage || " ")
            },
            errorMesage: descriptionFormError,
            key: 2
        }]

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setNameFormError(" ");
        setDescriptionFormError(" ")
    }, [currentUser]);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            details: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSend={isSend} >
            {inputs.map(({ type, minLength, maxLength, name, id, placeholder, required, value, onChange, errorMesage, key }) => {
                return <div key={key}>
                    <input
                        className={`popup__input popup__input_type_${name}`}
                        type={type}
                        id={id}
                        minLength={minLength}
                        maxLength={maxLength}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        value={value}
                        onChange={onChange}
                        key={key + 1}
                    />
                    <div className="popup__error" key={key + 2}>{errorMesage}</div>
                </div>
            })}
        </PopupWithForm>
    )
}

export default EditProfilePopup