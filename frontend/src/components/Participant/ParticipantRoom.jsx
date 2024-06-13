import React, {useEffect, useState, useRef} from 'react';

const ParticipantRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [ws, setWs] = useState(null);
    const [quiz, setQuiz] = useState({normal_id: ""});
    const name = useRef(null);
    const roomInput = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (message) => {
            const msgData = message.data;
            if (msgData.startsWith("ROOMID:")) {
                setRoomId(msgData.split(":")[1]);
            } else if (msgData.startsWith("JOINED:")) {
                setRoomId(msgData.split(":")[1]);
            } else if (msgData.startsWith("ERROR:")) {
                alert(msgData.split(":")[1]);
            } else if (msgData.startsWith("(Host)")) {
                getQuiz(msgData.split(":")[1]);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const joinRoom = () => {
        if (ws && roomInput.current.value.trim()) {
            ws.send("JOIN:" + roomInput.current.value.trim());
        }
    };

    const sendMessage = () => {
        if (ws && input.trim() && roomId) {
            const message = "(Participant)" + name.current.value + ": " + input;
            ws.send("MESSAGE:" + roomId + ":" + message);
            setInput(''); // Clear the input field
        }
    };

    const getQuiz = async (quizId) => {
        const response = await fetch(`/quiz/information?quizId=${quizId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // 오류 처리
            console.error('Failed to fetch quiz information');
            return;
        }

        const data = await response.json();
        setQuiz(data);
    }

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
                        이름: <input type={"text"} ref={name} value={name.current.value}/>
                    </div>
                    <div>
                        <button onClick={() => {
                            setInput("1")
                        }}>{quiz.normal_first_choice}
                        </button>
                        <br/>
                        <button onClick={() => {
                            setInput("2")
                        }}>{quiz.normal_second_choice}
                        </button>
                        <br/>
                        <button onClick={() => {
                            setInput("3")
                        }}>{quiz.normal_third_choice}
                        </button>
                        <br/>
                        <button onClick={() => {
                            setInput("4")
                        }}>{quiz.normal_fourth_choice}
                        </button>
                    </div>
                    <button onClick={sendMessage}>제출</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        ref={name}
                        placeholder="Enter your name"
                    />
                    <input
                        type="text"
                        ref={roomInput}
                        placeholder="Enter room ID"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            )}
        </div>
    );
};

export default ParticipantRoom;
