function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
      <div className='popup__container'>
        <form className='form' id={props.name + '-form'} name={props.name + '-form'} onSubmit={props.onSubmit}>
          <fieldset className='form__fieldset'>
            <h2 className='form__title'>{props.title}</h2>
            <div className='form__input-wrapper'>
              {props.children}
            </div>
            <button className='form__button-submit' type='submit' title='Сохранить изменения'>{props.buttonText}</button>
          </fieldset>
        </form>
        <button className='popup__button-close' onClick={props.onClose} type='button' title='Закрыть форму'></button>
      </div>
    </div>
  );
}

export default PopupWithForm;