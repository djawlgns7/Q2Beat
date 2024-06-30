import {useSocket} from "../context/SocketContext.jsx";
import PlayerTop from "../quiz/PlayerTop.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerRoundResult.css'
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/Q2Beat_background.png";
import TwisterPlayerRoundResult from "../quiz/twister/TwisterPlayerRoundResult.jsx";
import ListeningPlayerRoundResult from "../quiz/listening/ListeningPlayerRoundResult.jsx";
import PosePlayerRoundResult from "../quiz/pose/PosePlayerRoundResult.jsx";

const PlayerRoundResult = () => {
    const {hostMessage, setHostMessage, roomId} = useSocket();
    const [isReady, setIsReady] = useState(false);
    const [roundResult, setRoundResult] = useState("");
    const [playerScore, setPlayerScore] = useState("");
    const gameMode = useRef("");
    const playerName = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            playerName.current = sessionStorage.getItem("playerName");
            gameMode.current = sessionStorage.getItem("gameMode");
            setRoundResult(sessionStorage.getItem("isCorrect"));
            setPlayerScore(sessionStorage.getItem("playerScore"));
            console.log("Player score: ", sessionStorage.getItem("playerScore")); // 콘솔 로그 추가

            setIsReady(true);
        }, 100);
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
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <div className="container-m">
                            <div className="loginBox-m">
                                <div className="player-header">
                                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                                    <PlayerTop playerName={playerName.current}/>
                                </div>
                                <div className="round-result">
                                    {roundResult === "true" ? (
                                        <div className="round-result-container">
                                            <div className="green-circle">O</div>
                                            <h1>정답입니다!</h1>
                                        </div>
                                    ) : (
                                        <div className="round-result-container">
                                            <div className="red-x">X</div>
                                            <h1>오답입니다...</h1>
                                        </div>
                                    )
                                    }
                                    <h2>내 점수: {playerScore}</h2>
                                </div>
                            </div>
                            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
                        </div>
                    </>
                ) : gameMode.current === "TWISTER" ? (
                    // 잰말놀이
                    <TwisterPlayerRoundResult roomId={roomId} />
                ) : gameMode.current === "LISTENING" ? (
                    // 노래 맞추기
                    <>
                        <ListeningPlayerRoundResult />
                    </>
                ) : gameMode.current === "POSE" ? (
                    // 포즈 따라하기
                    <PosePlayerRoundResult roomId={roomId} />
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