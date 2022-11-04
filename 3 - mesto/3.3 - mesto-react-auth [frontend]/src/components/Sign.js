import React from 'react'

function Sign({ title, name, buttonText, isValid, onSubmit, linkLayout, children }) {
  return (
    <form
      className='form form_theme_dark'
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      <fieldset className='form__fieldset'>
        <h2 className='form__title form__title_theme_dark'>{title}</h2>
        <div className='form__input-wrapper'>
          {children}
        </div>
        <button
          className={`form__button-submit form__button-submit_theme_dark ${!isValid && 'form__button-submit_disabled'}`}
          type='submit'
          disabled={!isValid}
        >
          {buttonText}
        </button>
        
      </fieldset>
      {linkLayout && linkLayout}
    </form>
  )
}

export default Sign