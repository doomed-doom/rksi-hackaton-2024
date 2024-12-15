import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { loginUser } from '../../api'; // Функция для API-запроса

interface LoginResponse {
    access: string;
    refresh: string;
}

interface LoginError {
    detail?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Сбрасываем ошибку перед новым запросом

        if (email.trim() === '' || password.trim() === '') {
            setError('Логин и пароль не могут быть пустыми');
            return;
        }

        try {
            const response: LoginResponse = await loginUser({ email, password }); // Отправляем запрос на сервер
            console.log('Успешный вход:', response);

            // Сохраняем токены в localStorage
            localStorage.setItem('access', response.access);
            localStorage.setItem('refresh', response.refresh);

            // Перенаправляем на страницу аккаунта с перезагрузкой
            window.location.href = '/account';
        } catch (err: unknown) {
            // Явно проверяем тип ошибки
            if (err instanceof Error) {
                console.error('Ошибка входа:', err.message);
                setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'response' in err) {
                const errorResponse = err as { response?: { data?: LoginError } };
                console.error('Ошибка входа:', errorResponse.response?.data || 'Неизвестная ошибка');
                setError(errorResponse.response?.data?.detail || 'Ошибка входа. Проверьте логин и пароль.');
            } else {
                console.error('Неизвестная ошибка:', err);
                setError('Произошла неизвестная ошибка.');
            }
        }
    };

    return (
        <div className="login">
            <div className="login-form">
                <h1 className="text-3xl font-bold mb-4">Вход</h1>
                {error && <p className="error">{error}</p>} {/* Отображение ошибки */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleUsernameChange}
                            placeholder="Введите логин"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Введите пароль"
                            required
                        />
                    </div>
                    <button type="submit" className="rounded-button">
                        Войти
                    </button>
                    <div className="bot_button">
                        Нет аккаунта? <br />
                        <Link to="/registration" className="underline">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;