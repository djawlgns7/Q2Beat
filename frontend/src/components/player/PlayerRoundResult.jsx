import {useSocket} from "../context/SocketContext.jsx";
import PlayerTop from "../quiz/PlayerTop.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const PlayerRoundResult = () => {
    const {hostMessage, setHostMessage} = useSocket();
    const [isReady, setIsReady] = useState(false);
    const [roundResult, setRoundResult] = useState("");
    const [playerScore, setPlayerScore] = useState("");
    const gameMode = useRef("");
    const playerName = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        playerName.current = sessionStorage.getItem("playerName");
        gameMode.current = sessionStorage.getItem("gameMode");
        setRoundResult(sessionStorage.getItem("isCorrect"));
        setPlayerScore(sessionStorage.getItem("playerScore"));

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (hostMessage === "NEXTROUND") {
            navigate("/player/game/count");
        } else if (hostMessage === "GAMEEND") {
            setHostMessage("");

            setTimeout(() => {
                navigate("/player/game/result");
            }, 100);
        }
    }, [hostMessage]);

    return (
        <>
            <PlayerTop playerName={playerName.current}/>
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
                    <>
                        {roundResult === "true" ? (
                            <h1>정답입니다!</h1>
                        ) : (
                            <h1>오답입니다...</h1>
                        )
                        }
                        <h2>내 점수: {playerScore}</h2>
                    </>
                ) : gameMode.current === "SINGING" ? (
                    // 노래부르기
                    <h1>노래부르기</h1>
                ) : gameMode.current === "LYRIC" ? (
                    // 가사 맞추기
                    <h1>가사 맞추기</h1>
                ) : gameMode.current === "POSE" ? (
                    // 포즈 따라하기
                    <h1>포즈 따라하기</h1>
                ) : (
                    <h1>오류 발생</h1>
                )
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PlayerRoundResult;