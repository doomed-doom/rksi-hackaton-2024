import React from 'react'
import './account.css'
import userImage from '/user.png';
import { useState } from 'react';

function Account() {

    const userData = {
        name: 'Дамир',
        lastName: 'Рашидов',
        role: 'Ученик'
    }

    const [actualPage, setPage] = useState('achivments');

  return (
    <>
        <div className='profile'>
                <div className='user_main_info'>
                    <img src={userImage} alt="User" className="user-image"/>
                    <div>{userData.lastName} {userData.name}</div>
                    <div>Роль: <span className='orange'>{userData.role}</span></div>
                </div>
                <div onClick={() => setPage('achivments')} className={`change_btn ${actualPage=='achivments' ? 'selected_section' : ''}`}>Достижения</div>
                <div onClick={() => setPage('projects')} className={`change_btn ${actualPage=='projects' ? 'selected_section' : ''}`}>Проекты</div>
                <div className='user_table'>       
                    <div className='table_section '>
                        <div onClick={() => setPage('achivments')} className={`section ${actualPage=='achivments' ? 'selected_section' : ''}`}>Достижения</div>
                        <div onClick={() => setPage('projects')} className={`section ${actualPage=='projects' ? 'selected_section' : ''}`}>Проекты</div>
                    </div>
                    <div className='table_main'>
                        {actualPage=='achivments' ? "Достижения" : ''}
                        {actualPage=='projects' ? "Проекты" : ''}
                    </div>
                </div>
        </div>
    </>
  )
}

export default Account