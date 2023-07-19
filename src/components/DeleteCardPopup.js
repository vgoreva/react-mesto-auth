import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isSend }) {

    return (<PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonTitle="Да"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onDeleteCard}
        isSend={isSend} />
    )
}

export default DeleteCardPopup