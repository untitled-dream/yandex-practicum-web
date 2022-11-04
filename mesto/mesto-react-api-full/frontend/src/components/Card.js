import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwnCard = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className='elements__card'>
      <img className='elements__image' src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className='elements__title-wrapper'>
        <h2 className='elements__title'>{props.card.name}</h2>
        <div className='elements__like-container'>
          <button className={`elements__like-button ${isLiked && 'elements__like-button_active'}`} type='button' onClick={handleLikeClick}></button>
          <span className='elements__like-counter'>{props.card.likes.length}</span>
        </div>
      </div>
      { isOwnCard && 
        <button className='elements__trash-button' onClick={handleDeleteClick} type='button' title='Удалить запись'></button>
      }
    </li>
  );
}
export default Card;