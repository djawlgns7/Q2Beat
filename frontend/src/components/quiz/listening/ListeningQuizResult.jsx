import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../../css/PC.css';
import '../../../css/Quiz/RoundResult.css';
import Q2B_back from "../../../image/background-image.png";

const ListeningQuizResult = () => {
    const { roomId } = useSocket();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayerResults = async () => {
            try {
                const response = await fetch(`http://bit-two.com:8080/quiz/get/players/rank/list?roomId=${roomId}`);
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
        <div className="result-container">
            <h2>최종 결과</h2>
            <div className="result-list">
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
            <button onClick={() => navigate("/host/game/lobby")}>로비로 돌아가기</button>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p" />
        </div>
    );
};

export default ListeningQuizResult;
