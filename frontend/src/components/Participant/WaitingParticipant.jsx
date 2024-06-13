import React, {useState, useEffect} from 'react';
import {useSocket} from '../socket/SocketContext.jsx';
import {useNavigate} from "react-router-dom";

const WaitingParticipant = () => {
    const {sendMessage, roomId, hostMessage, setHostMessage, isConnected} = useSocket();
    const [input, setInput] = useState('');
    const [name, setName] = useState(sessionStorage.getItem('participantName') || '');
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('participantName');
        if (roomId && storedName) {
            setName(storedName);
        } else {
            navigate("/join-room");
        }
    }, []);

    useEffect(() => {
        // 방장이 시작 신호를 보내면
        if(hostMessage === "NORMAL") {
            alert("게임 시작");
            //navigate("/quiz-normal");
            setHostMessage("");
        }
    }, [hostMessage]);

    return (
        <div>
            <h1>방번호: {roomId}</h1>
            <h2>방장이 시작하길 기다리고 있습니다</h2>
        </div>
    );
};

export default WaitingParticipant;
