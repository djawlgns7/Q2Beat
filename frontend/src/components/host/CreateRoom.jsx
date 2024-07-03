import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from 'react-router-dom';
import '../../css/PC.css';
import '../../css/Host/CreateRoom.css'
import Q2B from "../../image/Q2BEAT_2.png";
import BackgroundVideo from "../BackgroundVideo.jsx";

const CreateRoom = () => {
    const {sendMessage, roomId, clearPlayInformation} = useSocket();
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');

        clearPlayInformation();

        if (roomId && storedName !== null) {
            navigate('/host/game/lobby');
        }
    }, []);

    const createRoom = () => {
        sendMessage("CREATE:" + name);
        sessionStorage.setItem('hostName', name);
        setTimeout(()=> {
            navigate('/host/game/lobby');
        }, 100);
    };

    return (
        <div className="container-p">
            <BackgroundVideo/>
            <div className="Box-p">
                <div className="logoTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div className="createRoom-main">
                    <div className="createRoom-input-border">
                        <div className="createRoom-input-box">
                            <input
                                type="text"
                                maxLength="14"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Room Number"
                                className="createRoom-input"
                            />
                        </div>
                    </div>
                    <button onClick={createRoom} className="createRoom-btn"><span>Create</span></button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
