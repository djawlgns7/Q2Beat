import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
    const [quizId, setQuizId] = useState('');
    const [hostMessage, setHostMessage] = useState('');
    const [clientMessage, setClientMessage] = useState('');
    const isConnected = useRef(false);

    const connectWebSocket = () => {
        const socket = new WebSocket('ws://3.36.56.34:8080/q2beat/ws');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            isConnected.current = true;

            const savedRoomId = sessionStorage.getItem('roomId');
            if (savedRoomId) {
                const hostName = sessionStorage.getItem('hostName');
                const playerName = sessionStorage.getItem('playerName');

                if (hostName) {
                    socket.send(`JOIN:HOST:${savedRoomId}:${hostName}`);
                } else if (playerName) {
                    socket.send(`JOIN:PLAYER:${savedRoomId}:${playerName}`);
                }
            }
        };

        socket.onmessage = (message) => {
            const msgData = message.data;
            if (msgData.startsWith("ROOMID:")) {
                alert("adf");
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
                setClientMessage(msgData);
            } else if (msgData.startsWith("START:")) {
                setHostMessage(msgData.split(":")[1]);
            } else if (msgData.startsWith("QUIZID:")) {
                setQuizId(msgData.split(":")[1]);
            } else if (msgData.startsWith("HOST:")) {
                setHostMessage(msgData.split(":")[1]);
            } else if (msgData.startsWith("PLAYER:")) {
                setClientMessage(msgData.split(":")[1]);
            } else {
                setMessages((prevMessages) => [...prevMessages, msgData]);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            clearPlayInformation();
            sessionStorage.removeItem('roomId');
            sessionStorage.removeItem('hostName');
            sessionStorage.removeItem('playerName');
            isConnected.current = false;
        };

        socketRef.current = socket;
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            socketRef.current.close();
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';  // Chrome requires returnValue to be set.
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current) {
            socketRef.current.send(message);
        }
    };

    const clearPlayInformation = () => {
        sessionStorage.removeItem('setting');
        sessionStorage.removeItem('answer');
        sessionStorage.removeItem('gameMode');
        sessionStorage.removeItem('isCorrect');
        sessionStorage.removeItem('playerScore');
    }

    const reconnectWebSocket = () => {
        if (socketRef.current) {
            socketRef.current.close();
        }
        connectWebSocket();
    }

    return (
        <SocketContext.Provider value={{
            sendMessage, messages, roomId, quizId, hostMessage, clientMessage, socketRef,
            setRoomId, setMessages, setQuizId, setHostMessage, setClientMessage, isConnected, clearPlayInformation, reconnectWebSocket
        }}>
            {children}
        </SocketContext.Provider>
    );
};
