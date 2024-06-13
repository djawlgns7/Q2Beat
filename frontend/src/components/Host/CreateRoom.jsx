import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../socket/SocketContext.jsx";
import {useNavigate} from 'react-router-dom';

const CreateRoom = () => {
    const {sendMessage, roomId} = useSocket();
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');

        if (roomId && storedName !== null) {
            navigate('/waiting-room');
        }
    }, []);

    const createRoom = () => {
        sendMessage("CREATE:" + name);
        sessionStorage.setItem('hostName', name);
        setTimeout(() => {
            navigate('/waiting-room');
        }, 100);
    };

    return (
        <div>
            <h1>Create Room</h1>
            <div>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <button onClick={createRoom}>Create Room</button>
            </div>
        </div>
    );
};

export default CreateRoom;
