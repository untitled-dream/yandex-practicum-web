import { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__avatar-wrapper'>
          <img className='profile__avatar' src={currentUser.avatar} alt={currentUser.name} />
          <button className='profile__button-avatar' type='button' onClick={props.onEditAvatar} title='Обновить фотографию'></button>
        </div>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__button-edit' type='button' onClick={props.onEditProfile} title='Редактировать профиль'></button>
          </div>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button className='profile__button-add' type='button' onClick={props.onAddPlace} title='Добавить фотографию'></button>
      </section>
      <section className='elements'>
        <ul className='elements__list'>
          {props.cardsArray.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;