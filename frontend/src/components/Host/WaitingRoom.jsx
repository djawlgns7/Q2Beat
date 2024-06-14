import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from "react-router-dom";

const WaitingRoom = () => {
    const {sendMessage, roomId, setRoomId, isConnected, clientMessage, setClientMessage} = useSocket();
    const [name, setName] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');

        if (roomId && storedName !== null) {
            setName(storedName);
        } else {
            navigate("/create-room")
        }
    }, []);

    useEffect(() => {
        const command = clientMessage.split(":")[0];
        const content = clientMessage.split(":")[1];

        if (command === "NEWMEMBER") {
            setParticipants([...participants, content]);
            setClientMessage("");
        } else if (command === "USERLEFT") {
            setParticipants([...participants.filter((participant) => participant !== content)]);
            setClientMessage("");
        }
    }, [clientMessage]);

    const startQuiz = () => {
        if (isConnected.current && roomId) {
            const gameMode = "NORMAL";
            sendMessage("START:" + roomId + ":" + gameMode);

            // 객체를 JSON 문자열로 변환하여 저장
            const setting = {
                gameMode: "NORMAL",
                round: 1,
                maxRound: 10,
                timeLimit: 10,
                category: "COMMON"
            };
            sessionStorage.setItem('setting', JSON.stringify(setting));

            navigate("/quiz-game");
        }
    }

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            sessionStorage.removeItem('hostName');
            sessionStorage.removeItem('roomId');
            setRoomId(null);

            navigate("/");
        }
    }

    return (
        <div>
            <h1>Waiting Room</h1>
            <div>
                <h2>Room ID: {roomId}</h2>
                <h4>링크: http://localhost:5173/join-room?roomNumber={roomId}</h4>
                <div>
                    <h3>참여자 목록</h3>
                    <h4>플레이어: {participants.length}</h4>
                    {participants.map((participant, index) => (
                        <div key={index}>{participant}</div>
                    ))}
                </div>
                <button onClick={startQuiz}>퀴즈 시작하기</button>
                <button onClick={exitRoom}>방 나가기</button>
            </div>
        </div>
    );
};

export default WaitingRoom;
