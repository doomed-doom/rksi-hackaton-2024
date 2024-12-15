import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://d13a-87-117-63-126.ngrok-free.app/api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData, {
        });
        console.log(response.data.id)
        localStorage.setItem('userToken', response.data.id); 
          
        const userToken =  localStorage.getItem('userToken');
        console.log(userToken);
        
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                throw new Error("Пользователь с таким email уже зарегистрирован");
            }
            throw new Error("Ошибка регистрации");
        } else {
            throw new Error('Ошибка сети. Попробуйте снова.');
        }
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Returns "Вход выполнен успешно"
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Неверный email или пароль");
            }
            throw new Error('Ошибка входа.');
        } else {
            throw new Error('Ошибка сети. Попробуйте позже.');
        }
    }
};

export const changePassword = async (passwordData) => {
    try {
        const response = await axios.post(`${API_URL}/users/change-password`, passwordData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Returns "Пароль успешно изменен"
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error("Неверный текущий пароль");
            }
            throw new Error('Ошибка смены пароля.');
        } else {
            throw new Error('Ошибка сети. Попробуйте позже.');
        }
    }
};

export const getUserInfo = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data; // Returns user information
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error(`Пользователь с id ${userId} не найден`);
            }
            throw new Error('Ошибка получения информации о пользователе.');
        } else {
            throw new Error('Ошибка сети. Попробуйте позже.');
        }
    }
};