import React from 'react';
import './mobile-navbar.css';
import arrow from '/arrow.png';
import cources from '/1.png';
import projects from '/2.png';
import chats from '/3.png';
import vacancies from '/4.png';
import { useNavigate } from 'react-router-dom';

interface MobileNavBarProps {
    isMenuActive: boolean;
    toggleMenu: () => void;
  }


function MobileNavbar({ isMenuActive, toggleMenu }: MobileNavBarProps) {
  const navigate = useNavigate();

  const redirTo = (path) => {
    navigate(path);
  };

  return (
    <div className='mobile_navbar'>
      <div onClick={() => redirTo("/courses")} className='nav_el'>
        <img src={cources} alt="Cources" />
        <a>Онлайн</a>
        <a>курсы</a>
      </div>
      <div onClick={() => redirTo("/projects")} className='nav_el'>
        <img src={projects} alt="Projects" />
        <a>Проекты</a>
      </div>
      <div onClick={() => redirTo("/chats")} className='nav_el'>
        <img src={chats} alt="Chats" />
        <a>Чаты</a>
      </div>
      <div onClick={() => redirTo("/vacancies")} className='nav_el'>
        <img src={vacancies} alt="Vacancies" />
        <a>Вакансии</a>
      </div>
      <div className='nav_el'>
        <div onClick={toggleMenu} className='arrow'>
          <img src={arrow} alt="Arrow" />
        </div>
        <a>Ещё</a>
      </div>
    </div>
  );
}

export default MobileNavbar;