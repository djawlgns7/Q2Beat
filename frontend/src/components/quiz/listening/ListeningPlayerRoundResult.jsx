import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../../css/Moblie.css';
import '../../../css/Participant/PlayerRoundResult.css';
import Q2B from "../../../image/Q2BEAT_2.png";
import Q2B_back from "../../../image/Q2Beat_background.png";
import PlayerTop from "../PlayerTop.jsx";

const ListeningPlayerRoundResult = () => {
    const { roomId, hostMessage, setHostMessage } = useSocket();
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [playerScore, setPlayerScore] = useState('');
    const playerName = useRef(sessionStorage.getItem("playerName"));
    const isCorrect = useRef(sessionStorage.getItem("isCorrect") === 'true');
    const navigate = useNavigate();

    useEffect(() => {
        const correctAnswerFromSession = sessionStorage.getItem("answer"); // 세션에서 correctAnswer 가져오기
        setCorrectAnswer(correctAnswerFromSession);

        const fetchRoundResult = async () => {
            try {
                const response = await fetch(`https://bit-two.com/quiz/get/round/result/listening?roomId=${roomId}&correctAnswer=${correctAnswerFromSession}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch round result');
                }
                const data = await response.json();
                console.log("Fetched round result: ", data); // 콘솔 로그 추가
                setCorrectAnswer(data.correctAnswer);
                const playerData = data.players.find(player => player.player_name === playerName.current);
                setPlayerScore(playerData?.player_score || 0);
            } catch (error) {
                console.error('Error fetching round result:', error);
            }
        };
        fetchRoundResult();
    }, [roomId]);

    useEffect(() => {
        if (hostMessage === "NEXTROUND") {
            navigate("/player/game/count");
        } else if (hostMessage === "GAMEEND") {
            setHostMessage("");
            setTimeout(() => {
                navigate("/player/game/result");
            }, 100);
        }
    }, [hostMessage, navigate, setHostMessage]);

    return (
        <>
            <div className="container-m">
                <div className="loginBox-m">
                    <div className="player-header">
                        <img src={Q2B} alt="Q2B" className="smallLogoImage-m" />
                        <PlayerTop playerName={playerName.current} />
                    </div>
                    <div className="round-result">
                        {isCorrect.current ? (
                            <div className="round-result-container">
                                <div className="green-circle">O</div>
                                <h1>정답입니다!</h1>
                            </div>
                        ) : (
                            <div className="round-result-container">
                                <div className="red-x">X</div>
                                <h1>정답을 맞추지 못하셨습니다...</h1>
                            </div>
                        )}
                        <h2>현재 {playerName.current}님의 점수는 {playerScore}점입니다.</h2>
                    </div>
                </div>
                <img src={Q2B_back} alt="Q2B_back" className="backImage-m" />
            </div>
        </>
    );
};

export default ListeningPlayerRoundResult;
