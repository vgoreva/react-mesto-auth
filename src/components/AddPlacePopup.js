import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {
    const [titleFormError, setTitleFormError] = useState(" ");
    const [linkFormError, setLinkFormError] = useState(" ");

    const inputName = useRef(null);
    const inputLink = useRef(null);

    const inputs =
        [{
            type: "text",
            minLength: 2,
            maxLength: 20,
            name: "title",
            id: "title",
            placeholder: "Новое место",
            required: true,
            ref: inputName || " ",
            onChange: evt => {
                setTitleFormError(evt.target.validationMessage || " ")
            },
            errorMesage: titleFormError,
            key: 1
        },
        {
            type: "url",
            name: "link",
            id: "link",
            placeholder: "Сcылка на картинку",
            required: true,
            ref: inputLink || "",
            onChange: evt => {
                setLinkFormError(evt.target.validationMessage || " ")
            },
            errorMesage: linkFormError,
            key: 2
        }]

    useEffect(() => {
        inputName.current.value = "";
        inputLink.current.value = "";
        setTitleFormError(" ");
        setLinkFormError(" ");
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({ title: inputName.current.value, link: inputLink.current.value })
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            buttonTitle="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSend={isSend}>

            {inputs.map(({ type, minLength, maxLength, name, id, placeholder, required, ref, onChange, errorMesage, key }) => {
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
                        ref={ref}
                        onChange={onChange}
                        key={key + 1}
                    />
                    <div className="popup__error" key={key + 2}>{errorMesage}</div>
                </div>
            })}

        </PopupWithForm>
    )
}

export default AddPlacePopup