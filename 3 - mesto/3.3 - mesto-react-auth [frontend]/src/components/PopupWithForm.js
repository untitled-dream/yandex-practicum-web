function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
      <div className='popup__container'>
        <form className='form' id={props.name} name={props.name} onSubmit={props.onSubmit}>
          <fieldset className='form__fieldset'>
            <h2 className='form__title'>{props.title}</h2>
            <div className='form__input-wrapper'>
              {props.children}
            </div>
            <button
              className={`form__button-submit ${props.isDisabled && 'form__button-submit_disabled'}`}
              type='submit'
              disabled={props.isDisabled}
              title='Сохранить изменения'
            >
              {props.isLoadingData ? props.isLoadingText : props.buttonText}
            </button>
          </fieldset>
        </form>

        <button
          className='popup__button-close'
          onClick={props.onClose}
          type='button'
          title='Закрыть форму'>
        </button>

      </div>
    </div>
  );
}

export default PopupWithForm;