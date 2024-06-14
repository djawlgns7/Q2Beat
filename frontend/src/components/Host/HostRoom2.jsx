import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";

const HostRoom2 = () => {
    const {sendMessage, roomId, isConnected, answer, setAnswer} = useSocket();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    useEffect(() => {
        if(answer !== ""){
            setMessages([...messages, answer]);
            setAnswer("");
        }
    }, [answer]);

    const createRoom = () => {
        sendMessage("CREATE:");
        sessionStorage.setItem('hostName', name);
    };

    const hostMessage = () => {
        if (isConnected.current && input.trim() && roomId) {
            const message = "(Host)" + name + ": " + input;
            sendMessage("MESSAGE:" + roomId + ":" + message);
            setMessages((prevMessages) => [...prevMessages, message]);
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
                        {messages.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                    <div>
                        이름: <input type="text" value={name} readOnly/>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter quiz number"
                    />
                    <button onClick={hostMessage}>Send</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <button onClick={createRoom}>Create Room</button>
                </div>
            )}
        </div>
    );
};

export default HostRoom2;
