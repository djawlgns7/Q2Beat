import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from "react-router-dom";
import '../../css/Host/WaitingRoom.css'
import Q2B from "../../image/Q2BEAT_2.png";

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
                maxRound: 2,
                timeLimit: 10,
                category: "COMMON"
            };
            sessionStorage.setItem('setting', JSON.stringify(setting));

            navigate("/quiz-count");
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
        <div className="waitingRoom-container">
            <div className="waitingRoom-box">
                <div className="waitingRoom-main-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage"/>
                    <button onClick={exitRoom} className="room-exit">나가기</button>
                </div>

                <div className="main-contents">
                    <div className="left-section">
                        <h3 className="player-count">플레이어 : {participants.length}</h3>
                        <div className="player-box">
                            <div>
                                {participants.map((participant, index) => (
                                    <div key={index} className="player">{participant}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        <h2 className="room-number">방 번호 : {roomId}</h2>
                        <div className="game-options">
                            <div className="option-1">
                                <button className="option-btn-1">퀴즈</button>
                                <button className="option-btn-1">가사 맞추기</button>
                            </div>
                            <div className="option-2">
                                <button className="option-btn-1">노래 부르기</button>
                                <button className="option-btn-1">포즈 따라하기</button>
                            </div>
                            <div className="actions">
                                <button onClick={startQuiz} className="action-btn">시작하기</button>
                                <button className="action-btn">QR코드</button>
                                {/*<div className="room-link">링크:*/}
                                {/*    http://localhost:5173/join-room?roomNumber={roomId}</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WaitingRoom;
