import React from 'react';
import close from '/close.png';
import './mobile-menu.css'

interface MobileMenuProps {
  isMenuActive: boolean;
  toggleMenu: () => void;
}

function MobileMenu({ isMenuActive, toggleMenu }: MobileMenuProps) {
  return (
    isMenuActive ? (
      <>
        <div className={`overlay_nav ${isMenuActive ? 'visible' : ''}`}></div>
        <div onClick={toggleMenu} className={`close_button ${isMenuActive ? 'visible' : ''}`}>
          <img src={close} alt="Close" />
        </div>
        <div className='menu_content'>
          <a onClick={toggleMenu} href='/courses'>Онлайн-курсы</a>
          <a onClick={toggleMenu} href='/projects'>Проекты</a>
          <a onClick={toggleMenu} href='/chats'>Чаты</a>
          <a onClick={toggleMenu} href='/vacancys'>Вакансии</a>
          <br />
          <br />
          <a className='blue' onClick={toggleMenu} href='/login'>Вход в аккаунт</a>
          <a className='orange' onClick={toggleMenu} href='/registration'>Регистрация</a>
        </div>
      </>
    ) : null
  );
}

export default MobileMenu;