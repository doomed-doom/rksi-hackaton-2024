import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registration.css';
import { registerUser } from '../../api';

const Registration: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigate hook

    const [userData, setuserData] = useState({
        firstName: '',
        lastName: '',
        role: 'student',
        password: '',
        email: '',
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setuserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const requestData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'student',
            password: userData.password,
            email: userData.email,
        };

        console.log('Отправляемые данные:', requestData);

        try {
            await registerUser(requestData);
            setIsFormSubmitted(true);
            console.log("Success")
            navigate('/login');
        } catch (err: any) {
            console.error('Ошибка сервера:', err.response?.data); // Log detailed error
            setError(err.response?.data?.email?.[0] || 'Ошибка регистрации');
            setShowErrorModal(true);
        }
    };

    const handleReset = () => {
        setIsFormSubmitted(false);
        setuserData({
            firstName: '',
            lastName: '',
            role: '',
            password: '',
            email: '',
        });
        setError(null);
    };

    const closeErrorModal = () => {
        setShowErrorModal(false); // Close the error modal
    };

    return (
      <div className="registration">
        {showErrorModal && (
          <div className="error-modal">
            <div className="error-modal-content">
              <p text-center px-auto>{error}</p>
              <button onClick={closeErrorModal} className="close-button">
                Закрыть
              </button>
            </div>
          </div>
        )}
        <div className="registration-form">
          <h1 className="text-3xl font-bold mb-4">Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="lastName">Фамилия:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Введите фамилию"
                required
                disabled={isFormSubmitted}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Имя:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Введите имя"
                required
                disabled={isFormSubmitted}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
                disabled={isFormSubmitted}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Введите email"
                required
                disabled={isFormSubmitted}
              />
            </div>
            <div>
              <button
                type="submit"
                className="rounded-button"
                onClick={isFormSubmitted ? handleReset : undefined}
              >
                {isFormSubmitted ? "Сбросить" : "Зарегистрироваться"}
              </button>
            </div>
            <div className="bot_button">
              Уже есть аккаунт? 
              {" "}
              <Link to="/login" className="underline">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Registration;