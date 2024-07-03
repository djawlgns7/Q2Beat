//src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    try {
        const member = JSON.parse(sessionStorage.getItem('member'));
        const admin = JSON.parse(sessionStorage.getItem('admin'));
        const sessionId = sessionStorage.getItem('sessionId'); //세션 ID를 로컬 스토리지에서 가져옴

        if (admin && admin.token) {  // Assuming 'token' is stored in 'member'
            config.headers.Authorization = `Bearer ${admin.token}`;
        } else if (member && member.token) {
            config.headers.Authorization = `Bearer ${member.token}`;
        }

        if(sessionId) { // 세션 ID가 존재할 경우
            config.headers['X-Session-Id'] = sessionId; //세션 ID를 HTTP 헤더에 추가
        }
    } catch (error) {
        console.error('Error parsing: 세션 스토리지 데이터', error);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
