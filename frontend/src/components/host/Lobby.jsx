import React, {useEffect, useState} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from "react-router-dom";
import {useModal} from "../context/ModalContext.jsx";
import '../../css/Host/Lobby.css'
import '../../css/PC.css'
import Q2B from "../../image/Q2BEAT_2.png";
import BackgroundVideo from "../BackgroundVideo.jsx";

const Lobby = () => {
    const {socketRef, sendMessage, roomId, setRoomId, isConnected, clientMessage, setClientMessage, clearPlayInformation} = useSocket();
    const {showModal, setModalType, setModalTitle, setModalBody, setUseErrorModal} = useModal();
    const [name, setName] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = sessionStorage.getItem('hostName');
        clearPlayInformation();
        if (roomId && storedName !== null) {
            setName(storedName);
        } else {
            navigate("/host/game/create");
        }
        setUseErrorModal(false);
    }, [setUseErrorModal]);

    useEffect(() => {
        setClientMessage("");

        if (roomId !== null && roomId !== undefined) {
            getPlayersList();
        }
    }, [clientMessage]);

    const getPlayersList = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/player/list?roomId=${roomId}`)
            if (!response.ok) {
                throw new Error('Failed to get player list');
            }
            const data = await response.json();
            setParticipants(data);
        } catch (error) {
            console.error('Error fetching player list:', error);
        }
    }

    const startQuiz = (gameType) => {
        if (isConnected.current && roomId) {
            sessionStorage.setItem("playerNumber", participants.length + "");

            setTimeout(() => navigate("/host/game/setting/"+gameType), 500);
        }
    }

    const showQR = () => {
        setModalType("QR");
        setModalTitle("QR코드 표시");
        setModalBody(`http://localhost:5173/player/game/join?roomNumber=${roomId}`);
        showModal();
    }

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            sendMessage(`MESSAGE:${roomId}:HOST:DISMISS`);

            sessionStorage.removeItem('hostName');
            sessionStorage.removeItem('roomId');
            setRoomId(null);
            socketRef.current.close();

            navigate("/host/game/create");
        }
    }

    return (
        <div className="container-p">
            <BackgroundVideo/>
            <div className="contents-box-p">
                <div className="lobby-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage"/>
                    <h3 className="player-count">플레이어 : {participants.length}</h3>
                    <h2 className="room-number">방 번호 : {roomId}</h2>
                    <button className="qrCode-btn" onClick={showQR}>
                        <span className="svgContainer">QR</span>
                        <span className="BG"></span>
                    </button>
                    <button onClick={exitRoom} className="exit-btn">
                        EXIT
                        <div className="arrow-icon">
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="2"
                                ></path>
                            </svg>
                        </div>
                    </button>
                </div>

                <div className="lobby-main">
                    {/*플레이어 박스*/}
                    <div className="left-section">
                        <div className="player-box">
                            <div className="players">
                                {participants.map((participant, index) => (
                                    <div key={index} className="player">{participant.player_name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*게임 박스*/}
                    <div className="right-section">
                        <div className="game-options">
                            <div className="option-box">
                                <button className="option-btn-1">Quiz 🤔</button>
                                <button className="hover-button" onClick={() => {startQuiz(0)}}>START!</button>
                            </div>
                            <div className="option-box">
                                <button className="option-btn-1">Jukebox 🎵</button>
                                <button className="hover-button" onClick={() => {startQuiz(1)}}>START!</button>
                            </div>
                            <div className="option-box">
                                <button className="option-btn-1">Tongue-twister 😛</button>
                                <button className="hover-button" onClick={() => {startQuiz(2)}}>START!</button>
                            </div>
                            <div className="option-box">
                                <button className="option-btn-1">Photogenic 📷</button>
                                <button className="hover-button" onClick={() => {startQuiz(3)}}>START!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<img src={backImage} alt="backImage" className="backImage-p"/>*/}
        </div>
    );
};
export default Lobby;
