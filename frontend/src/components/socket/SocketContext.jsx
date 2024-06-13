import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
    const [quiz, setQuiz] = useState('');
    const [hostMessage, setHostMessage] = useState('');
    const [clientMessage, setClientMessage] = useState('');
    const isConnected = useRef(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            isConnected.current = true;

            const savedRoomId = sessionStorage.getItem('roomId');
            if (savedRoomId) {
                socket.send(`JOIN:${savedRoomId}`);
            }
        };

        socket.onmessage = (message) => {
            const msgData = message.data;
            if (msgData.startsWith("ROOMID:")) {
                const newRoomId = msgData.split(":")[1];
                setRoomId(newRoomId);
                sessionStorage.setItem('roomId', newRoomId);
            } else if (msgData.startsWith("JOINED:")) {
                const newRoomId = msgData.split(":")[1];
                setRoomId(newRoomId);
                sessionStorage.setItem('roomId', newRoomId);
            } else if (msgData.startsWith("ERROR:")) {
                alert(msgData.split(":")[1]);
            } else if (msgData.startsWith("NEWMEMBER:")) {
                setClientMessage(msgData);
            } else if (msgData.startsWith("USERLEFT:")) {
                alert("사람나감 메시지임");
                setClientMessage(msgData);
            } else if(msgData.startsWith("START:")) {
                setHostMessage(msgData.split(":")[1]);
            } else if (msgData.startsWith("(Host)")) {
                getQuiz(msgData.split(":")[1]);
            } else if (msgData.startsWith("(Participant)")) {
                setClientMessage(msgData);
            } else {
                setMessages((prevMessages) => [...prevMessages, msgData]);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            isConnected.current = false;
            sessionStorage.clear();
        };

        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current) {
            socketRef.current.send(message);
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
    };

    return (
        <SocketContext.Provider value={{ sendMessage, messages, roomId, quiz, hostMessage, clientMessage,
            setRoomId, setMessages, setQuiz, setHostMessage, setClientMessage, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};