import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";

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
            const response = await fetch(`/quiz/get/players/rank/list?roomId=${roomId}`);
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
            const response = await fetch(`/quiz/reset/room?roomId=${roomId}`);
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
            <h1>결과</h1>

            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <div>
                            <ul>
                                {players.map((player, index) => (
                                    <li key={index}>
                                        <span>{index + 1}등 &nbsp;</span>
                                        <span>{player.player_name} &nbsp;</span>
                                        <span>{player.player_score}점</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : setting.gameMode === "SINGING" ? (
                    // 노래부르기
                    <h1>노래부르기</h1>
                ) : setting.gameMode === "LYRIC" ? (
                    // 가사 맞추기
                    <h1>가사 맞추기</h1>
                ) : setting.gameMode === "POSE" ? (
                    // 포즈 따라하기
                    <h1>포즈 따라하기</h1>
                ) : (
                    <h1>오류 발생</h1>
                )
            ) : (
                <>
                </>
            )}

            <button onClick={returnLobby}>대기실로 돌아가기</button>
        </>
    );
}

export default QuizResult