import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { useFormValidation } from '../hooks/useFormValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingData }) {

  const {
    inputValue,
    errorText,
    isValid,
    resetForm,
    handleChange
  } = useFormValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(inputValue)
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      title='Обновить аватар'
      name='avatar-update'
      buttonText='Сохранить'
      isLoadingData={isLoadingData}
      isLoadingText={'Сохранение...'}
    >
      <label className='form__field'>
        <input
          className='form__input'
          id='avatar'
          name='avatar'
          type='url'
          placeholder='Ссылка на фотографию'
          autoComplete='off'
          onChange={handleChange}
          value={inputValue.avatar || ''}
          required
        />
        <span className={errorText.avatar ? 'form__input-error form__input-error_active avatar-error' : 'form__input-error'}>{errorText.avatar}</span>
      </label>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;