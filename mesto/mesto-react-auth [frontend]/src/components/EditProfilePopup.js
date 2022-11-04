import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../hooks/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingData }) {

  const currentUser = useContext(CurrentUserContext);

  const {
    inputValue,
    errorText,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation({});
  
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(inputValue);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isDisabled={!isValid}
      onSubmit={handleSubmit}
      title='Редактировать профиль'
      name='profile-edit'
      buttonText='Сохранить'
      isLoadingData={isLoadingData}
      isLoadingText={'Сохранение...'}
    >
      <label className='form__field'>
        <input
          className={`form__input ${errorText.name && 'form__input_type_error'}`}
          id='name'
          name='name'
          minLength='2'
          maxLength='40'
          placeholder='Имя'
          autoComplete='off'
          value={inputValue.name || ''}
          onChange={handleChange}
          required
        />
        <span className={`form__input-error ${errorText.name && 'form__input-error_active'}`}>{errorText.name}</span>
      </label>
      <label className='form__field'>
        <input
          className={`form__input ${errorText.about && 'form__input_type_error'}`}
          id='about'
          name='about'
          minLength='2'
          maxLength='200'
          placeholder='О себе'
          autoComplete='off'
          value={inputValue.about || ''}
          onChange={handleChange}
          required
        />
        <span className={`form__input-error ${errorText.about && 'form__input-error_active'}`}>{errorText.about}</span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup;