import React, {useState, useEffect} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import PlayerTop from "../quiz/PlayerTop.jsx";

const WaitingParticipant = () => {
    const {socketRef, roomId, setRoomId, hostMessage, setHostMessage} = useSocket();
    const [name, setName] = useState(sessionStorage.getItem('playerName') || '');
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('playerName');
        if (roomId && storedName !== null) {
            setName(storedName);
        } else {
            navigate("/join-room");
        }
    }, []);

    useEffect(() => {
        // 방장이 시작 신호를 보내면
        if(hostMessage === "NORMAL" || hostMessage === "SINGING" || hostMessage === "LYRIC" || hostMessage === "POSE") {
            sessionStorage.setItem('gameMode', hostMessage);
            sessionStorage.setItem('playerName', name);

            navigate("/player-count");
            setHostMessage("");
        }
    }, [hostMessage]);

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            sessionStorage.removeItem('playerName');
            sessionStorage.removeItem('roomId');
            setRoomId(null);
            socketRef.current.close();

            window.location.reload();
        }
    }

    return (
        <div>
            <PlayerTop playerName={name} />
            <h1>방번호: {roomId}</h1>
            <h2>방장이 시작하길 기다리고 있습니다</h2>
            <button onClick={exitRoom}>방 나가기</button>
        </div>
    );
};

export default WaitingParticipant;
