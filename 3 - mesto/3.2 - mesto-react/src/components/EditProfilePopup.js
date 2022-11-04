import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title='Редактировать профиль'
      name='profile-edit'
      buttonText='Сохранить'
    >
      <label className='form__field'>
        <input
          className='form__input'
          id='name'
          name='name'
          minLength='2'
          maxLength='40'
          placeholder='Имя'
          autoComplete='off'
          value={name || ''}
          onChange={handleNameChange}
          required
        />
        <span className='form__input-error name-error'></span>
      </label>
      <label className='form__field'>
        <input
          className='form__input'
          id='about'
          name='about'
          minLength='2'
          maxLength='200'
          placeholder='О себе'
          autoComplete='off'
          value={description || ''}
          onChange={handleDescriptionChange}
          required
        />
        <span className='form__input-error about-error'></span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup;