import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Q2B from "../image/Q2BEAT_2.png";
import '../css/PC.css'
import '../css/MainPage.css';
import BackgroundVideo from "./BackgroundVideo.jsx";

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
            <BackgroundVideo />
            <div className="Box-p">
                <div className="logoTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>

                <div className="main-btns">
                    <button className="main-button" onClick={() => navigate('/host/game/create')}>Create Room</button>
                    <button className="main-button" onClick={() => navigate('/host/game/create')}>Create Quiz</button>
                </div>
                <button className="main-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default MainPage;
