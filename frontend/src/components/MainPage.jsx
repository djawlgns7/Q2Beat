import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Q2B from "../image/Q2BEAT_2.png";
import '../css/PC.css'
import '../css/MainPage.css';
import BackgroundVideo from "./BackgroundVideo.jsx";
import {useSocket} from "./context/SocketContext.jsx";

const MainPage = () => {
    const {sendMessage, clearPlayInformation, isConnected} = useSocket();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);

    useEffect(() => {
        clearPlayInformation();
    }, [])

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const handleModalConfirm = async () => {
        setShowLogoutModal(false);

        try {
            await axios.post('http://localhost:8080/api/members/logout');
            sessionStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const handleModalCancel = () => {
        setShowLogoutModal(false);
    };

    const createRoom = () => {
        if (isConnected.current) {
            sendMessage("CREATE:" + "host");
            sessionStorage.setItem('hostName', "host");
            setTimeout(() => {
                navigate('/host/game/lobby');
            }, 100);
        } else {
            alert("현재 서버와 연결이 끊어졌습니다. 재접속 중입니다");
        }
    };

    const createQuiz = () => {
        setShowCreateQuizModal(true);
    }

    return (
        <div className="container-p">
            <BackgroundVideo/>
            <div className="Box-p">
                <div className="logoTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>

                <div className="main-btns">
                    <button className="main-button" onClick={createRoom}>
                        <div className="btn-int">
                            <span className="btn_span">Create Room</span>
                        </div>
                    </button>
                    <button className="main-button" onClick={createQuiz}>
                        <div className="btn-int">
                            <span className="btn_span">Create Quiz</span>
                        </div>
                    </button>
                </div>
                <button className="main-button logout-button" onClick={handleLogout}>
                    <div className="btn-int">
                        <span className="btn-span">Logout</span>
                    </div>
                </button>
            </div>
            {showCreateQuizModal && (
                <div className="modal show">
                    <div className="modal-content">
                        <h5>현재 퀴즈 만들기 기능은 준비 중 입니다.</h5>
                        <div className="button-container">
                            <button className="confirm-button" onClick={() => setShowCreateQuizModal(false)}>확인</button>
                        </div>
                    </div>
                </div>
            )}

            {showLogoutModal && (
                <div className="modal show">
                    <div className="modal-content">
                        <h5>로그아웃 하시겠습니까?</h5>
                        <div className="button-container">
                            <button className="confirm-button" onClick={handleModalConfirm}>예</button>
                            <button className="cancel-button" onClick={handleModalCancel}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
