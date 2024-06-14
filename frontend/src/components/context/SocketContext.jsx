import React, {createContext, useContext, useEffect, useRef, useState} from 'react';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({children}) => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(sessionStorage.getItem('roomId') || null);
    const [quizId, setQuizId] = useState('');
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
            } else if (msgData.startsWith("(Participant)")) {
                setClientMessage(msgData);
            } else {
                setMessages((prevMessages) => [...prevMessages, msgData]);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
            isConnected.current = false;
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

    // const getQuiz = async (quizId) => {
    //     const response = await fetch(`/quiz/information?quizId=${quizId}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //
    //     if (!response.ok) {
    //         // 오류 처리
    //         console.error('Failed to fetch quiz information');
    //         return;
    //     }
    //
    //     const data = await response.json();
    //     setQuiz(data);
    // };

    return (
        <SocketContext.Provider value={{
            sendMessage, messages, roomId, quizId, hostMessage, clientMessage, socketRef,
            setRoomId, setMessages, setQuizId, setHostMessage, setClientMessage, isConnected
        }}>
            {children}
        </SocketContext.Provider>
    );
};