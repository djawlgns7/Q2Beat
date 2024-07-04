import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../../css/Moblie.css';
import '../../../css/Quiz/Listening/ListeningPlayerRoundResult.css'
import Q2B from "../../../image/Q2BEAT_2.png";
import Q2B_back from "../../../image/background-image.png";
import successIcon from '../../../image/icon-checked.png'
import failIcon from '../../../image/icon-cancel.png'
import PlayerTop from "../PlayerTop.jsx";

const ListeningPlayerRoundResult = () => {
    const { roomId, hostMessage, setHostMessage } = useSocket();
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [playerScore, setPlayerScore] = useState('');
    const playerName = useRef(sessionStorage.getItem("playerName"));
    const [roundResult, setRoundResult] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const correctAnswerFromSession = sessionStorage.getItem("answer");
        setCorrectAnswer(correctAnswerFromSession);

        const fetchRoundResult = async () => {
            try {
                const response = await fetch(`http://localhost:8080/quiz/get/round/result/listening?roomId=${roomId}&correctAnswer=${correctAnswerFromSession}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch round result');
                }
                const data = await response.json();
                console.log("Fetched round result: ", data);
                const playerData = data.players.find(player => player.player_name === playerName.current);
                setPlayerScore(playerData?.player_score || 0);
                setRoundResult(sessionStorage.getItem("isCorrect") === "true");
            } catch (error) {
                console.error('Error fetching round result:', error);
            }
        };
        fetchRoundResult();
    }, [roomId]);

    useEffect(() => {
        if (hostMessage === "NEXTROUND") {
            sessionStorage.setItem("isCorrect", "false");
            navigate("/player/game/count");
        } else if (hostMessage === "GAMEEND") {
            setHostMessage("");
            setTimeout(() => {
                navigate("/player/game/result");
            }, 100);
        }
    }, [hostMessage, navigate, setHostMessage]);

    return (
        <div className="container-m">
            <div className="Box-m">
                <div className="player-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m" />
                    <PlayerTop playerName={playerName.current} />
                </div>
                <div className="listening-round-result-container">
                    {roundResult ? (
                        <div className="listening-round-result-box">
                            <img src={successIcon} alt="successIcon" className="success-icon"/>
                            <h1 className="correct-text">정답입니다!</h1>
                        </div>
                    ) : (
                        <div className="listening-round-result-box">
                            <img src={failIcon} alt="failIcon" className="fail-icon"/>
                            <h1 className="fail-text">다음 기회에..</h1>
                        </div>
                    )}
                    <div className="listening-score-box">
                        <span>
                            <h2>현재 점수<br/>
                                <div className="listening-playerScore">{playerScore}점</div>
                            </h2>
                        </span>
                    </div>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m" />
        </div>
    );
};

export default ListeningPlayerRoundResult;
