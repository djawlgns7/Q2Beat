import React, {useState, useEffect} from 'react';
import {useSocket} from '../socket/SocketContext.jsx';

const ParticipantRoom2 = () => {
    const {sendMessage, roomId, quiz, isConnected} = useSocket();
    const [input, setInput] = useState('');
    const [name, setName] = useState(sessionStorage.getItem('participantName') || '');
    const [roomInput, setRoomInput] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('participantName');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    const joinRoom = () => {
        if (roomInput.trim()) {
            sendMessage("JOIN:" + roomInput + "&" + name);
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
            <h1>WebSocket Chat</h1>
            {roomId ? (
                <div>
                    <h2>Room ID: {roomId}</h2>
                    <div>
                        <h2>{quiz.normal_quiz}</h2>
                    </div>
                    <div>
                        이름: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={() => setInput("1")}>{quiz.normal_first_choice}</button>
                        <br/>
                        <button onClick={() => setInput("2")}>{quiz.normal_second_choice}</button>
                        <br/>
                        <button onClick={() => setInput("3")}>{quiz.normal_third_choice}</button>
                        <br/>
                        <button onClick={() => setInput("4")}>{quiz.normal_fourth_choice}</button>
                    </div>
                    <button onClick={sendAnswer}>제출</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <input
                        type="text"
                        value={roomInput}
                        onChange={(e) => setRoomInput(e.target.value)}
                        placeholder="Enter room ID"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            )}
        </div>
    );
};

export default ParticipantRoom2;
