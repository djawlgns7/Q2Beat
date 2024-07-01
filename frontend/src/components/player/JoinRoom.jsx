import React, {useState, useEffect} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import '../../css/Participant/JoinRoom.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/background-image.png";

const JoinRoom = () => {
    const {sendMessage, roomId, clearPlayInformation} = useSocket();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState('');
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        clearPlayInformation();
        const storedName = sessionStorage.getItem('playerName');
        const roomNumber = params.get("roomNumber");

        if (roomId && storedName !== null) {
            navigate("/player/game/waiting");
        } else if(roomNumber) {
            setRoomInput(roomNumber);
        }

    }, []);

    useEffect(() => {
        sessionStorage.setItem('playerName', name);
        if (roomId && name) {
            navigate("/player/game/waiting");
        }
    }, [roomId]);

    const joinRoom = () => {
        if (roomInput.trim()) {
            sendMessage("JOIN:PLAYER:" + roomInput + ":" + name);
            sessionStorage.setItem('playerName', name);
        }
    };

    return (
        <div className="container-m">
            <div className="Box-m">
                <div className="join-header">
                    <img src={Q2B} alt="Q2B" className="logoImage-m"/>
                    <h1 className="title-m">Q2BEAT</h1>
                </div>
                <div className="inputForm">
                    <div className="join-form">
                        {/*<h2 className="join-label-text">Room No:</h2>*/}
                        <div className="box-input">
                            <div className="border-input">
                                <input
                                    className="join-input"
                                    placeholder="roomNum"
                                    type="text"
                                    maxLength="5"
                                    value={roomInput}
                                    onChange={(e) => setRoomInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="join-form">
                        {/*<h2 className="join-label-text">이름</h2>*/}
                        <div className="box-input">
                            <div className="border-input">
                                <input
                                    className="join-input"
                                    placeholder="name"
                                    type="text"
                                    maxLength="20"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={joinRoom} className="startBtn"><span>입장</span></button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default JoinRoom;
