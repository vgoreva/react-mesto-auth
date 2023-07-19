import Header from './/Header';
import Footer from './/Footer';
import Register from './Register';
import Login from './Login';

import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';
import auth from '../utils/auth';

import { useCallback, useEffect, useState } from 'react';

import ProtectedRoute from './ProtectedRoute';
import ProtectedPageStructure from './ProtectedPageStructure';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  //Состояния(стейты) попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  //Состояния(стейты) попапов карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(" ");
  //Состояния(стейты) данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)
  //Состояния(стейты) данных авторизации
  const [userEmail, setUserEmail] = useState(" ");
  const [result, setResult] = useState(false);

  const navigate = useNavigate()

  //Обработчики регистрации и аутенификации
  function handleRegister(data) {
    setIsSend(true);
    auth.registration(data)
      .then(() => {
        setIsAuthPopupOpen(true);
        setEventListnerForEsc();
        setResult(true);
        window.scrollTo(0, 0);
        navigate('/sign-in');
      })
      .catch(error => {
        setIsAuthPopupOpen(true);
        setEventListnerForEsc();
        setResult(false);
        console.log(`Ошибка: ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleLogin(data)  {
    setIsSend(true);
    auth.authorization(data)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate('/');
      })
      .catch(error => {
        setIsAuthPopupOpen(true);
        setEventListnerForEsc();
        setResult(false);
        console.log(`Ошибка: ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  //Обработчики открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListnerForEsc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListnerForEsc();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListnerForEsc();
  }

  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(true);
    setEventListnerForEsc();
    setDeleteCardId(cardId)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListnerForEsc();
  }

  //Обработчики закрытия попапов
  const setStatesforCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopup(false);
    setIsDeleteCardPopupOpen(false);
    setIsAuthPopupOpen(false);
  },
    [])

  const closeAllPopupsWithEsc = useCallback((evt) => {
    if (evt.key === "Escape") {
      setStatesforCloseAllPopups();
      document.removeEventListener('keydown', closeAllPopupsWithEsc);
    }
  }, [setStatesforCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStatesforCloseAllPopups();
    document.removeEventListener('keydown', closeAllPopupsWithEsc);
  }, [setStatesforCloseAllPopups, closeAllPopupsWithEsc])

  function setEventListnerForEsc() {
    document.addEventListener('keydown', closeAllPopupsWithEsc);
  }

  function handleAddPlaceSubmit(data) {
    setIsSend(true);

    api.createCard(data)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups()
        setIsSend(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }

  //Обработчик постановки и снятия лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }

  // Обработчик удаления карточки
  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsSend(true);

    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSend(false);
      })
      .catch(error => console.log(`Ошибка: ${error} `));
  }

  // Обработчик обновления данных пользователя
  function handleUpdateUser(dataUser) {
    setIsSend(true);

    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsSend(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }

  // Обработчик обновления автара
  function handleUpdateAvatar(data) {
    setIsSend(true);

    api.setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsSend(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }

  // Рендер начальных карточек и данных польхователя
  useEffect(() => {
    if(loggedIn){
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
      })
      .catch(error => console.log(`Ошибка: ${error}`))
  }}, [loggedIn])

  // Проверка токена и сохранение email
  useEffect(() => {
    if (localStorage.jwt) {
      auth.getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          navigate("/")
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  // Рендер всего приложения
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <div className="page__content">

          <Routes>
            <Route path='/'
              element={<ProtectedRoute
                element={ProtectedPageStructure}

                loggedIn={loggedIn}

                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards={cards}
                userEmail={userEmail}
              />
              } />

            <Route path='/sign-up' element={
              <div>
                <Header
                  name='signup' />
                <Register
                  onRegister={handleRegister}
                />
              </div>
            } />

            <Route path='/sign-in' element={
              <div>
                <Header
                  name='signin' />
                <Login
                  onLogin={handleLogin}
                />
              </div>
            } />

            <Route path='*' element={<Navigate to="/" replace />} />

          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSend={isSend}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSend={isSend}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSend={isSend}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isSend={isSend}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopup}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            name="result"
            result={result}
            isOpen={isAuthPopupOpen}
            onClose={closeAllPopups}
          />

        </div>
      </div >
    </CurrentUserContext.Provider>);
}

export default App
