import React, {useState, useEffect} from 'react';
import {useSocket} from '../socket/SocketContext.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import '../../css/JoinRoom.css'

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
        if (roomId && storedName) {
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
        <div>
            <h1 className="joinRoom-title">Join Room</h1>
            <div>
                <div>
                    <input
                        type="text"
                        value={roomInput}
                        onChange={(e) => setRoomInput(e.target.value)}
                        placeholder="Enter room ID"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoom;
