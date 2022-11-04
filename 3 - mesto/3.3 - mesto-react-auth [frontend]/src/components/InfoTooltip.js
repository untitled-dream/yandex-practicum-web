import React from 'react'

import successSignUpIcon from '../images/icon-successSignUp.svg'
import errorSignUpIcon from '../images/icon-errorSignUp.svg'

function InfoTooltip({ isOpen, onClose, isSuccess }) {

  return (

    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <div className='popup__info-wrapper'>
          <img
            className="popup__info-image"
            src={isSuccess ? successSignUpIcon : errorSignUpIcon}
            alt='Результат регистрации'
          />
          <h3 className="popup__title">
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}
          </h3>
        </div>
        <button onClick={onClose} type="button" className="popup__button-close"></button>
      </div>
    </div>
  )
}

export default InfoTooltip