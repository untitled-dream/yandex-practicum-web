import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_dark-background ${props.card.link && 'popup_opened'}`} id='card-view'>
      <figure className='popup__figure'>
        <img className='popup__image' id='card-image' src={`${props.card.link}`} alt={`${props.card.name}`} />
        <button className='popup__button-close' onClick={props.onClose} type='button' title='Закрыть форму'></button>
        <figcaption className='popup__caption'>
          <h2 className='popup__caption-text' id='card-place'>{props.card.name}</h2>
        </figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup;