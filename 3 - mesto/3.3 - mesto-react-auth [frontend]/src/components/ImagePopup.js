function ImagePopup({ card, ...props }) {
  return (
    <div className={`popup popup_dark-background ${card.link && props.isOpen ? 'popup_opened' : ''}`} id='card-view'>
      <figure className='popup__figure'>
        <img className='popup__image' id='card-image' src={`${card.link}`} alt={`${card.name}`} />
        <button className='popup__button-close' onClick={props.onClose} type='button' title='Закрыть форму'></button>
        <figcaption className='popup__caption'>
          <h2 className='popup__caption-text' id='card-place'>{card.name}</h2>
        </figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup;