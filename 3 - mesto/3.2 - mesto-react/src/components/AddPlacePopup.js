import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const place = useRef(null);
  const link = useRef(null)

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      place: place.current.value,
      link: link.current.value
    })
  }

  useEffect(() => {
    place.current.value = '';
    link.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title='Новое место'
      name='card-add'
      buttonText='Создать'
    >
      <label className='form__field'>
        <input
          className='form__input'
          id='place'
          name='place'
          minLength='2'
          maxLength='30'
          placeholder='Название'
          autoComplete='off'
          ref={place}
          required
        />
        <span className='form__input-error place-error'></span>
      </label>
      <label className='form__field'>
        <input
          className='form__input'
          id='link'
          name='link'
          type='url'
          placeholder='Ссылка на картинку'
          autoComplete='off'
          ref={link}
          required
        />
        <span className='form__input-error link-error'></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;