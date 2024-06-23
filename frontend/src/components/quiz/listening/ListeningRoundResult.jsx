import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../../css/PC.css';
import '../../../css/Quiz/RoundResult.css';
import Q2B_back from "../../../image/Q2Beat_background.png";

const ListeningRoundResult = () => {
    const { sendMessage, roomId } = useSocket();
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correctPlayers, setCorrectPlayers] = useState([]);
    const [currentRound, setCurrentRound] = useState(() => {
        const setting = JSON.parse(sessionStorage.getItem('setting'));
        return setting.round;
    });
    const navigate = useNavigate();
    const intervalRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(5);

    useEffect(() => {
        const fetchRoundResult = async () => {
            try {
                const response = await fetch(`/quiz/get/round/result/listening?roomId=${roomId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch round result');
                }
                const data = await response.json();
                setCorrectAnswer(data.correctAnswer);
                setCorrectPlayers(data.players);
            } catch (error) {
                console.error('Error fetching round result:', error);
            }
        };
        fetchRoundResult();
    }, [roomId]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    if (currentRound >= 5) {
                        sendMessage(`MESSAGE:${roomId}:HOST:GAMEEND`);
                        navigate('/host/game/result/listening');
                    } else {
                        sendMessage(`MESSAGE:${roomId}:HOST:NEXTROUND`);
                        navigate('/host/game/count');
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [currentRound, roomId, sendMessage, navigate]);

    return (
        <div className="round-container">
            <div className="round-box">
                <div className="circle-header-game">
                    {['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'].map((color, index) => (
                        <div key={index} className="circle-game" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
                <h2 className="round-answer">문제 {currentRound}</h2>
                <h4 className="round-timer">{currentTime}</h4>
            </div>
            <div>
                <h3>정답은: {correctAnswer}</h3>
                <div>
                    {correctPlayers.length > 0 ? (
                        correctPlayers.map((player, index) => (
                            <div key={index}>
                                {player.player_name} - 점수: {player.player_score}
                            </div>
                        ))
                    ) : (
                        <div>정답자가 없습니다...</div>
                    )}
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p" />
        </div>
    );
};

export default ListeningRoundResult;
