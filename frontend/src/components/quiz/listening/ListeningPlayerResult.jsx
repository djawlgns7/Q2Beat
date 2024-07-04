import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../../css/Moblie.css';
import '../../../css/Participant/PlayerRoundResult.css';
import Q2B from "../../../image/Q2BEAT_2.png";
import Q2B_back from "../../../image/Q2Beat_background.png";
import PlayerTop from "../../quiz/PlayerTop.jsx";

const ListeningPlayerResult = () => {
    const { roomId } = useSocket();
    const [players, setPlayers] = useState([]);
    const playerName = useRef(sessionStorage.getItem("playerName"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayerResults = async () => {
            try {
                const response = await fetch(`http://localhost:8080/quiz/get/players/rank/list?roomId=${roomId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch player results');
                }
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching player results:', error);
            }
        };
        fetchPlayerResults();
    }, [roomId]);

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="player-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m" />
                    <PlayerTop playerName={playerName.current} />
                </div>
                <div className="result-list">
                    <h2>최종 결과</h2>
                    {players.length > 0 ? (
                        players.map((player, index) => (
                            <div key={index} className="result-item">
                                {player.player_name} - 점수: {player.player_score}
                            </div>
                        ))
                    ) : (
                        <div>결과를 가져올 수 없습니다.</div>
                    )}
                </div>
                <button onClick={() => navigate("/player/game/lobby")}>로비로 돌아가기</button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m" />
        </div>
    );
};

export default ListeningPlayerResult;
