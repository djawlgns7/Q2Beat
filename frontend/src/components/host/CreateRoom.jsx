import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from 'react-router-dom';
import '../../css/PC.css';
import '../../css/Host/CreateRoom.css'
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/Q2Beat_background.png";

console.log("CreateRoom.jsx from jun");
const CreateRoom = () => {
    const {sendMessage, roomId, clearPlayInformation, reconnectWebSocket} = useSocket();
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');

        clearPlayInformation();

        if (roomId && storedName !== null) {
            navigate('/host/game/lobby');
        }

        setTimeout(() => reconnectWebSocket(), 100);
    }, []);

    const createRoom = () => {
        sendMessage("CREATE:" + name);
        sessionStorage.setItem('hostName', name);
        setTimeout(() => {
            navigate('/host/game/lobby');
        }, 300);
    };

    return (
        <div className="container-p">
            <div className="loginBox-p">
                <div className="loginTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div>
                    <h2 className="createRoom-title">방 이름 : </h2>
                    <input
                        type="text"
                        maxLength="14"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <br/>
                <button onClick={createRoom} className="createRoom">생성</button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default CreateRoom;
