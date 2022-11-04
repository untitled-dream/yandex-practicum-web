import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';

import Api from '../utils/Api'
import Authentication from '../utils/Authentication';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext'

/* Auth Components */
import Login from './Login';
import Register from './Register';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [cardsArray, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  const [isSuccessSignUp, setIsSuccessSignUp] = useState(false);
  const [authorizationUser, setAutorizationUser] = useState(null);

  const history = useHistory();

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isViewImagePopupOpen, setViewImagePopupOpen] = useState(false);

  const [isLoadingUserDataSubmit, setIsLoadingUserDataSubmit] = useState(false);
  const [isLoadingPlaceSubmit, setIsLoadingPlaceSubmit] = useState(false);
  const [isLoadingAvatarSubmit, setIsLoadingAvatarSubmit] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  const [isPasswordDisplay, setPasswordDisplay] = useState(true);

  function handlePasswordDisplay(){
    setPasswordDisplay(!isPasswordDisplay)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleInfoTooltipPopupOpen() {
    setInfoTooltipOpen(!isInfoTooltipOpen)
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);

    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setViewImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoadingUserDataSubmit(true)
    Api.setUserData(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUserDataSubmit(false))
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatarSubmit(true)
    Api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingAvatarSubmit(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((card) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? card : currentCard));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    Api.removeCard(card._id)
      .then(() => {
        const newCardsArray = cardsArray.filter(item => item !== card);
        setCards(newCardsArray);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingPlaceSubmit(true)
    Api.sendCard(data)
      .then((newCard) => {
        setCards([newCard, ...cardsArray]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingPlaceSubmit(false))
  }

  useEffect(() => {
    Api.getInitialData()
      .then((data) => {
        const [userInfo, cardsData] = data;
        setCards(cardsData);
        setCurrentUser(userInfo);
      }
      ).catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.code === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [])

  useEffect(() => {
    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('mousedown', handleOverlayClose);
    return () => document.removeEventListener('mousedown', handleOverlayClose);
  }, [])

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleRegistration(data) {
    Authentication.register(data)
      .then((data) => {
        setIsSuccessSignUp(true);
        handleInfoTooltipPopupOpen();
        history.push('/sign-in')
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessSignUp(false);
        handleInfoTooltipPopupOpen();
      })
  }

  function handleAuthorization(data) {
    Authentication.authorize(data)
      .then((data) => {
        setLoggedIn(true);
        
        localStorage.setItem('jwt', data.token);
        history.push('/');
      }
      ).catch((err) => console.log(err))
  }

  const handleCheckToken = useCallback((token) => {
    Authentication.checkToken(token)
      .then((data) => {
        setAutorizationUser(data.data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err))
  }, [history],
  )

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleCheckToken(token);
    }
  }, [handleCheckToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        onSingOut={handleSingOut}
        authorizationUser={authorizationUser}
      />

      <Switch>
        <Route path='/sign-up'>
          <Register
            onRegister={handleRegistration}
            isPasswordDisplay={isPasswordDisplay}
            onPasswordDisplay={handlePasswordDisplay}
          />
        </Route>
        <Route path='/sign-in'>
          <Login
            onLogin={handleAuthorization}
            isPasswordDisplay={isPasswordDisplay}
            onPasswordDisplay={handlePasswordDisplay}
          />
        </Route>
        <ProtectedRoute
          exact
          path='/'
          component={Main}
          loggedIn={loggedIn}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cardsArray={cardsArray}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>
      
      <Footer />

      <ImagePopup
        isOpen={isViewImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoadingData={isLoadingPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoadingData={isLoadingAvatarSubmit}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoadingData={isLoadingUserDataSubmit}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccessSignUp}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;