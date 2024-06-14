import React, {useState, useEffect} from 'react';
import {useSocket} from '../socket/SocketContext.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import '../../css/Participant/JoinRoom.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";

const JoinRoom = () => {
    const {sendMessage, roomId} = useSocket();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState('');
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('participantName');
        const roomNumber = params.get("roomNumber");
        if (roomId && storedName !== null) {
            navigate("/waiting-participant");
        } else if(roomNumber) {
            setRoomInput(roomNumber);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('participantName', name);
        if (roomId && name) {
            navigate("/waiting-participant");
        }
    }, [roomId]);

    const joinRoom = () => {
        if (roomInput.trim()) {
            sessionStorage.setItem('participantName', name);
            sendMessage("JOIN:PLAYER:" + roomInput + ":" + name);
        }
    };

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <img src={Q2B} alt="Q2B" className="logoImage-m"/>
                <h1 className="title-m">Q2BEAT</h1>
                <div className="inputForm">
                    <div className="roomNum-section">
                        <div className="roomNum">방 번호 :</div>
                        <input
                            type="text"
                            value={roomInput}
                            onChange={(e) => setRoomInput(e.target.value)}
                        />
                    </div>
                    <div className="name-section">
                        <div className="name">이름 :</div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="footer-mobile">
                    <button onClick={joinRoom} className="startBtn">입장</button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoom;
