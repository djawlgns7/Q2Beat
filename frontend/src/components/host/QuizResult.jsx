import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import '../../css/PC.css'
import '../../css/Host/QuizResult.css'
import backImage from "../../image/background-image.png";
import first_medal from "../../image/icon-1st-medal.png";
import second_medal from "../../image/icon-2nd-medal.png";
import third_medal from "../../image/icon-3rd-medal.png";

const QuizResult = () => {
    const {sendMessage, roomId} = useSocket();
    const [isReady, setIsReady] = useState(false);
    const [players, setPlayers] = useState([]);
    const [setting, setSetting] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);

        fetchPlayersRank();

        setIsReady(true);
    }, []);

    const fetchPlayersRank = async () => {
        try {
            const response = await fetch(`https://bit-two.com/quiz/get/players/rank/list?roomId=${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player rank');
            }
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error('Error fetching player rank:', error);
        }
    };

    const clearHistory = async () => {
        try {
            const response = await fetch(`https://bit-two.com/quiz/reset/room?roomId=${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to clear room history');
            }
            console.log("Successfully clear room history");
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    };

    const returnLobby = () => {
        clearHistory();

        sendMessage(`MESSAGE:${roomId}:HOST:RETURNLOBBY`);
        navigate('/host/game/lobby');
    }

    return (
        <>
            {isReady ? (
                <>
                    <div className="container-p">
                        <div className="contents-box-p">
                            <h1 className="quiz-result-text">결과</h1>
                            <ul className="result-list">
                                {players.map((player, index) => (
                                    index < 3 ? (
                                        <li key={index} className="player-section">
                                            {index === 0 ? (
                                                <img src={first_medal} alt="first_medal" className="medal-icon"/>
                                            ) : index === 1 ? (
                                                <img src={second_medal} alt="second_medal" className="medal-icon"/>
                                            ) : (
                                                <img src={third_medal} alt="third_medal" className="medal-icon"/>
                                            )}
                                            <span className="index-player">{index + 1}등 &nbsp;</span>
                                            <span className="index-player">{player.player_name} &nbsp;</span>
                                            {setting.gameMode === "TWISTER" || setting.gameMode === "POSE" ? (
                                                <span className="index-player">{player.player_score / 100}%</span>
                                            ) : (
                                                <span className="index-player">{player.player_score}점</span>
                                            )}
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                            <div className="result-btn">
                                <button onClick={returnLobby} className="endGame-button"><span>나가기</span></button>
                            </div>
                        </div>
                        <img src={backImage} alt="backImage" className="backImage-p"/>
                    </div>

                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default QuizResult