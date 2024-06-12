import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/members/logout');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Main Page</h2>
            <button onClick={() => navigate('/create-room')}>방 생성</button>
            <button onClick={() => navigate('/join-room')}>방에 참여</button>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MainPage;
