import React, {useState, useEffect} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import '../../css/Participant/WaitingParticipant.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/Q2Beat_background.png";

const PlayerWaiting = () => {
    const {socketRef, roomId, setRoomId, hostMessage, setHostMessage, sendMessage, clearPlayInformation} = useSocket();
    const [name, setName] = useState(sessionStorage.getItem('playerName') || '');
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        clearPlayInformation();
        const storedName = sessionStorage.getItem('playerName');
        setName(storedName);

        sendMessage(`MESSAGE:${roomId}:PLAYER:${storedName}`);
    }, []);

    useEffect(() => {
        // 방장이 시작 신호를 보내면
        if(hostMessage === "NORMAL" || hostMessage === "TWISTER" || hostMessage === "LISTENING" || hostMessage === "POSE") {
            sessionStorage.setItem('gameMode', hostMessage);
            sessionStorage.setItem('playerName', name);
            sessionStorage.setItem('round', "1");

            if(hostMessage === "TWISTER") {
                requestPermission();
            }

            navigate("/player/game/count");
            setHostMessage("");
        } else if (hostMessage === "DISMISS") {
            exit();
        }
    }, [hostMessage]);

    const exit = () => {
        sessionStorage.removeItem('playerName');
        sessionStorage.removeItem('roomId');
        setRoomId(null);
        socketRef.current.close();

        navigate("/player/game/join");
    }

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            exit();
        }
    }

    const requestPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({audio: true});
        } catch (error) {
            console.error('MicroPhone permission denied: ', error);
        }
    }

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="waitingPart-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                    <h3 className="name-header">{name} 님</h3>
                </div>
                <div className="waitingPart-main">
                    <h1>방번호 : {roomId}</h1>
                    <br/>
                    <h2 className="waiting-message">게임이 곧 시작합니다.<br/>잠시만 기다려주세요.</h2>
                </div>
                <div className="exit-button">
                    <button onClick={exitRoom} className="exitBtn">나가기</button>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default PlayerWaiting;
