import React from 'react'

import Sign from './Sign'
import PasswordDisplay from './PasswordDisplay';

import { useFormValidation } from '../hooks/useFormValidation';

function Login({ onLogin, isPasswordDisplay, onPasswordDisplay }) {

  const {
    inputValue,
    errorText,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(inputValue);
    resetForm();
  }

  return (

    <Sign
      title={'Вход'}
      name={'authentication'}
      buttonText={'Войти'}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <label className='form__field'>
        <input
          className='form__input form__input_theme_dark'
          type='email'
          id='email'
          placeholder='Email'
          name='email'
          required
          maxLength='30'
          autoComplete='off'
          value={inputValue.email || ''}
          onChange={handleChange}
        />
        <span className={`form__input-error ${errorText.email && 'form__input-error_active'}`} id='email-error'>{errorText.email}</span>
      </label>
      <label className='form__field'>
        <input
          className='form__input form__input_theme_dark'
          type={isPasswordDisplay ? 'password' : 'text'}
          id='password'
          placeholder='Пароль'
          name='password'
          required
          value={inputValue.password || ''}
          onChange={handleChange}
        />
        <PasswordDisplay
          isDisplay={isPasswordDisplay}
          onDisplay={onPasswordDisplay}
        />
        <span className={`form__input-error ${errorText.password && 'form__input-error_active'}`} id='password-error'>{errorText.password}</span>
      </label>
    </Sign>

  )
}

export default Login