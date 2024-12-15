import React from 'react'
import { Link } from 'react-router-dom';
import './main-page.css'
import img1 from '/main/1.jpg'
import img2 from '/main/2.jpg'
import img3 from '/main/3.jpg'

function MainPage() {
  return (
    <>
        <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
        <h1 className='text-m'>Вот чем наш сайт может быть Вам полезен:</h1>
        <div className='card_catalog'>
                    <div className='card'>
                        <div className='card_image'>
                            <img src={img1} alt="User" className="cropped-image"/>
                        </div>
                        <h2>Онлайн-курсы</h2>
                        <a><span className='orange_let'>Онлайн-курсы</span>, созданные преподавателями, которые повысят ваши скиллы!</a>
                        <Link to="/login">
                            <button className='rounded-button custom'>Перейти на вкладку</button>
                        </Link>
                    </div>
                    <div className='card'>
                        <div className='card_image'>
                            <img src={img2} alt="User" className="cropped-image"/>
                        </div>
                        <h2>Совместные проекты</h2>
                        <a><span className='orange_let'>Работайте вместе</span> в совместных проектах!</a>
                        <Link to="/login">
                            <button className='rounded-button custom'>Перейти на вкладку</button>
                        </Link>
                    </div>
                    <div className='card'>
                        <div className='card_image'>
                            <img src={img3} alt="User" className="cropped-image"/>
                        </div>
                        <h2>Поиск вакансий</h2>
                        <a>Множество <span className='orange_let'>вакансий</span> от разных работадателей!</a>
                        <Link to="/login">
                            <button className='rounded-button custom'>Перейти на вкладку</button>
                        </Link>
                    </div>
                </div>
    </>
  )
}

export default MainPage