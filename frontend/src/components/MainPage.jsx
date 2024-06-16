import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Q2B from "../image/Q2BEAT_2.png";
import '../css/PC.css'
import '../css/MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/members/logout');
            sessionStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-p">
            <div className="loginBox-p">
                <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                <h1 className="title-p">Q2BEAT</h1>
                <div className="main-btns">
                    <button onClick={() => navigate('/host/game/create')}>방 생성</button>
                    <button onClick={() => navigate('/player/game/join')}>방에 참여</button>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
