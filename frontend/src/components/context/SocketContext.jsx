import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client'
import { useModal } from "./ModalContext.jsx";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
    const [quizId, setQuizId] = useState('');
    const [hostMessage, setHostMessage] = useState('');
    const [clientMessage, setClientMessage] = useState('');
    const [quiz, setQuiz] = useState(null);  // 추가된 부분
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const isConnected = useRef(false);
    const location = useLocation(); // 현재 경로를 가져오기 위한 훅
    const maxReconnectAttempts = 10;

    const { showErrorModal, setModalType, setModalTitle, setModalBody } = useModal();

    const connectWebSocket = () => {

        if (reconnectAttempts >= maxReconnectAttempts) {
            console.log('Maximum reconnect attempts reached');
            clearPlayInformation();
            sessionStorage.removeItem('playerName')
            setRoomId(null);

            return;
        }

        const socket = new SockJS('https://bit-two.com/ws');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            isConnected.current = true;
            setReconnectAttempts(0);

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
                const newRoomId = msgData.split(":")[1];
                setRoomId(newRoomId);
                sessionStorage.setItem('roomId', newRoomId);
            } else if (msgData.startsWith("JOINED:")) {
                const newRoomId = msgData.split(":")[1];
                setRoomId(newRoomId);
                sessionStorage.setItem('roomId', newRoomId);
            } else if (msgData.startsWith("ERROR:")) {
                setModalType('error');
                setModalTitle('오류');
                setModalBody(msgData.split(":")[1]);
                showErrorModal();
            } else if (msgData.startsWith("NEWMEMBER:")) {
                setClientMessage(msgData);
            } else if (msgData.startsWith("USERLEFT:")) {
                setClientMessage(msgData);
            } else if (msgData.startsWith("START:")) {
                setHostMessage(msgData.split(":")[1]);
            } else if (msgData.startsWith("QUIZID:")) {
                setQuizId(msgData.split(":")[1]);
            } else if (msgData.startsWith("HOST:")) {
                setHostMessage(msgData.split(":", 2)[1]);
            } else if (msgData.startsWith("PLAYER:")) {
                setClientMessage(msgData.split(":", 2)[1]);
            } else if (msgData.startsWith("QUIZ:")) {  // 퀴즈 데이터 수신
                const quizData = JSON.parse(msgData.split(":", 2)[1]);
                setQuiz(quizData);
            } else {
                setMessages((prevMessages) => [...prevMessages, msgData]);
            }
        };

        socket.onclose = () => {
            console.log(`WebSocket disconnected, attempt ${reconnectAttempts + 1}`);
            isConnected.current = false;
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            socket.close();
        };

        socketRef.current = socket;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isConnected.current) {
                connectWebSocket();
            }
        }, 500);

        return () => {
            clearInterval(interval);
            socketRef.current.close();
        };
    }, [reconnectAttempts]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (location.pathname !== '/host/game/create' && location.pathname !== '/host/game/join' && location.pathname !== '/main') {  // 특정 페이지를 확인
                event.preventDefault();
                event.returnValue = '';  // Chrome requires returnValue to be set.
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [location]);

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

    return (
        <SocketContext.Provider value={{
            sendMessage,
            messages,
            roomId,
            quizId,
            hostMessage,
            clientMessage,
            socketRef,
            quiz,
            setRoomId,
            setMessages,
            setQuizId,
            setHostMessage,
            setClientMessage,
            isConnected,
            clearPlayInformation
        }}>
            {children}
        </SocketContext.Provider>
    );
};
