import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import headerLogo from '../images/header-logo.svg';

function Header({ loggedIn, onSingOut, authorizationUser }) {

  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleSignOut() {
    setMenuIsOpen(false);
    onSingOut();
  }

  return (
    <header className={loggedIn ? 'header header_row-reverse' : 'header'}>
      {loggedIn &&
        (
          <div className={menuIsOpen ? 'header__menu header__menu_opened' : 'header__menu'}>
            <p className='header__login'>{authorizationUser && authorizationUser}</p>
            <button className='header__button' type='button' onClick={handleSignOut}>Выйти</button>
          </div>
        )
      }

      <div className='header__container'>
        <img className='header__logo' src={headerLogo} lang='en' alt='Mesto - Russia Logo' />
        {loggedIn &&
          (
            <button
              className={menuIsOpen ? 'header__menu-button header__menu-button_opened' : 'header__menu-button'}
              type='button'
              onClick={handleToggleMenu}
            />
          )
        }

        {!loggedIn && (
          <nav>
            {location.pathname === '/sign-in' &&
              (
                <NavLink className='header__link link' to='/sign-up'>Регистрация</NavLink>
              )
            }
            {location.pathname === '/sign-up' &&
              (
                <NavLink className='header__link link' to='/sign-in'>Войти</NavLink>
              )
            }
          </nav>
        )
        }
      </div>
    </header>
  );
}

export default Header;