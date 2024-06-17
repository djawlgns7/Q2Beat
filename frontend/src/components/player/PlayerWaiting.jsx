import React, {useState, useEffect} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import PlayerTop from "../quiz/PlayerTop.jsx";
import '../../css/Participant/WaitingParticipant.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";

const PlayerWaiting = () => {
    const {socketRef, roomId, setRoomId, hostMessage, setHostMessage, sendMessage, clearPlayInformation} = useSocket();
    const [name, setName] = useState(sessionStorage.getItem('playerName') || '');
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        clearPlayInformation();
        const storedName = sessionStorage.getItem('playerName');

        if (roomId && storedName !== null) {
            setName(storedName);
        } else {
            navigate("/player/game/join");
        }

        sendMessage(`MESSAGE:${roomId}:PLAYER:${storedName}`);
    }, []);

    useEffect(() => {
        // 방장이 시작 신호를 보내면
        if(hostMessage === "NORMAL" || hostMessage === "SINGING" || hostMessage === "LYRIC" || hostMessage === "POSE") {
            sessionStorage.setItem('gameMode', hostMessage);
            sessionStorage.setItem('playerName', name);

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

            window.location.reload();
    }

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            exit();
        }
    }

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="waitingPart-main-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage"/>
                    <span className="name-header">{name} 님</span>
                </div>
                <h1>방번호 : {roomId}</h1>
                <br/>
                <h2>방장이 시작하길 기다리고 있습니다...</h2>
                <button onClick={exitRoom} className="exitBtn">나가기</button>
            </div>
        </div>
    );
};

export default PlayerWaiting;
