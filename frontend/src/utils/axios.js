// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: '', // Vite proxy 사용
});

instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
