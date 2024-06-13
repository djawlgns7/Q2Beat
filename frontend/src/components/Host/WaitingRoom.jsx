import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../socket/SocketContext.jsx";
import {useNavigate} from "react-router-dom";

const WaitingRoom = () => {
    const {sendMessage, roomId, isConnected, clientMessage, setClientMessage} = useSocket();
    const [name, setName] = useState('');
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');
        alert("이름: " + storedName);

        if (roomId && storedName) {
            setName(storedName);
        } else {
            navigate("/create-room")
        }
    }, []);

    useEffect(() => {
        const command = clientMessage.split(":")[0];
        const content = clientMessage.split(":")[1];

        if(command === "NEWMEMBER") {
            setParticipants([...participants, content]);
            setClientMessage("");
        }else if(command === "USERLEFT") {
            setParticipants([...participants.filter((participant) => participant !== content)]);
            setClientMessage("");
        }
    }, [clientMessage]);

    const startQuiz = () => {
        if (isConnected.current && roomId) {
            const message = "NORMAL";
            sendMessage("START:" + roomId + ":" + message);
        }
    }

    return (
        <div>
            <h1>Waiting Room</h1>
            <div>
                <h2>Room ID: {roomId}</h2>
                <h4>링크: http://localhost:5173/join-room?roomNumber={roomId}</h4>
                <div>
                    방장 이름: {name}
                </div>
                <div>
                    <h3>참여자 목록</h3>
                    {participants.map((participant, index) => (
                        <div key={index}>{participant}</div>
                    ))}
                </div>
                <button onClick={startQuiz}>퀴즈 시작하기</button>
            </div>
        </div>
    );
};

export default WaitingRoom;
