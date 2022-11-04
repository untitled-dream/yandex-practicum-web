import React from 'react'
import { Link } from 'react-router-dom';

import Sign from './Sign'
import PasswordDisplay from './PasswordDisplay';

import { useFormValidation } from '../hooks/useFormValidation';

function Register({ onRegister, isPasswordDisplay, onPasswordDisplay }) {

  const {
    inputValue,
    errorText,
    isValid,
    handleChange,
    resetForm
  } = useFormValidation({});

  const linkLayout = (
    <p className='form__subtitle form__subtitle_theme_dark'>Уже зарегистрированы? <Link className='link' to='/sign-in'>Войти</Link></p>
  )

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(inputValue);
    resetForm();
  }

  return (
    <Sign
      title={'Регистрация'}
      name={'registration'}
      buttonText={'Зарегистрироваться'}
      isValid={isValid}
      onSubmit={handleSubmit}
      linkLayout={linkLayout}
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

export default Register