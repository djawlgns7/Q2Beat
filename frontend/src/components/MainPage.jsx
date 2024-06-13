import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Q2B from "../image/Q2BEAT_2.png";
import '../css/Login.css';

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
        <div className="container">
            <div className="login-box">
                <img src={Q2B} alt="Q2B" className="logoImage"/>
                <h1 className="title">Q2BEAT</h1>
                <div className="main-btns">
                    <button onClick={() => navigate('/create-room')}>방 생성</button>
                    <button onClick={() => navigate('/join-room')}>방에 참여</button>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
