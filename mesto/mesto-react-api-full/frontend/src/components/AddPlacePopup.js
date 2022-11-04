import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { useFormValidation } from '../hooks/useFormValidation';

function AddPlacePopup(props) {

  const {
    inputValue,
    errorText,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(inputValue)
  }

  useEffect(() => {
    resetForm({}, {}, false)
  }, [props.isOpen, resetForm])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      title='Новое место'
      name='card-add'
      buttonText='Создать'
      isLoadingData={props.isLoadingData}
      isLoadingText={'Создание...'}
    >
      <label className='form__field'>
        <input
          className={`form__input ${errorText.place && 'form__input_type_error'}`}
          id='place'
          name='place'
          minLength='2'
          maxLength='30'
          placeholder='Название'
          autoComplete='off'
          value={inputValue.place || ''}
          onChange={handleChange}
          required
        />
        <span className={`form__input-error ${errorText.place && 'form__input-error_active'}`}>{errorText.place}</span>
      </label>
      <label className='form__field'>
        <input
          className={`form__input ${errorText.link && 'form__input_type_error'}`}
          id='link'
          name='link'
          type='url'
          placeholder='Ссылка на картинку'
          autoComplete='off'
          value={inputValue.link || ''}
          onChange={handleChange}
          required
        />
        <span className={`form__input-error ${errorText.link && 'form__input-error_active'}`}>{errorText.link}</span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;