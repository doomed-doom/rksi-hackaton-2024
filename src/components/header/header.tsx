import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '/user.png';

interface HeaderProps {
  isLogedIn: boolean; // Добавляем пропс isLogedIn
}

const Header: React.FC<HeaderProps> = ({ isLogedIn }) => {

    const navigate = useNavigate();

    const username = 'test_user'

    const redirTo = (path: string) =>
      navigate(path)

    return (
      <>
        <header className="header">
          <div onClick={() => redirTo("/")} className="logo">
            <span className="blue_let">E</span>du
            <span className="orange_let">C</span>onnect
          </div>
          <nav className={`nav`}>
            <ul className="nav-list">
              <li>
                <a href="#">Онлайн-курсы</a>
              </li>
              <li>
                <a href="/projects">Проекты</a>
              </li>
              <li>
                <a href="/chats">Чаты</a>
              </li>
              <li>
                <a href="/vacancy">Вакансии</a>
              </li>
            </ul>
          </nav>
          {isLogedIn ? <div onClick={() => redirTo("/account")} className='user_info'><a>{username}</a><img src={logo}/></div> : 
          <div className="push-to-end">
            <a href='/registration'>Регистрация</a>
            <button onClick={() => redirTo("/login")} className="rounded-button main">Войти</button>
          </div>}
        </header>
      </>
    );
};

export default Header;