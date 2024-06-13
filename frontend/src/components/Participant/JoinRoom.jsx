import React, {useState, useEffect} from 'react';
import {useSocket} from '../socket/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import '../../css/JoinRoom.css'

const JoinRoom = () => {
    const {sendMessage, roomId, isConnected} = useSocket();
    const [input, setInput] = useState('');
    const [name, setName] = useState(sessionStorage.getItem('participantName') || '');
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('participantName');
        if(roomId && storedName) {
            navigate("/waiting-participant");
        }
    }, []);

    useEffect(() => {
        const storedName = sessionStorage.getItem('participantName');
        if(roomId && storedName) {
            navigate("/waiting-participant");
        }
    }, [roomId]);

    const joinRoom = () => {
        if (roomInput.trim()) {
            sendMessage("JOIN:" + roomInput + ":" + name);
            sessionStorage.setItem('participantName', name);
        }
    };

    const sendAnswer = () => {
        if (isConnected && input.trim() && roomId) {
            const message = "(Participant)" + name + ": " + input;
            sendMessage("MESSAGE:" + roomId + ":" + message);
            setInput(''); // Clear the input field
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
