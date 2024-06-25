import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import React, {useEffect, useRef, useState} from "react";
import PlayerTop from "../quiz/PlayerTop.jsx";
import {useSocket} from "../context/SocketContext.jsx";
import NormalButton from "../quiz/NormalButton.jsx";
import {useNavigate} from "react-router-dom";
import ListeningText from "../quiz/ListeningText.jsx";
import Q2B from "../../image/Q2BEAT_2.png";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerQuizPage.css'
import Q2B_back from "../../image/Q2Beat_background.png";
import TwisterAnswer from "../quiz/twister/TwisterAnswer.jsx";

const PlayerQuizPage = () => {
    const {sendMessage, hostMessage, setHostMessage, quizId} = useSocket();
    const [isReady, setIsReady] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("");
    const gameMode = useRef("");
    const playerName = useRef("");
    const answer = useRef("");
    const navigate = useNavigate();
    const roundNumber = useRef(0);
    const roomId = useRef("");

    useEffect(() => {
        playerName.current = sessionStorage.getItem("playerName");
        gameMode.current = sessionStorage.getItem("gameMode");
        roundNumber.current = Number(sessionStorage.getItem("round"));
        roomId.current = sessionStorage.getItem("roomId");

        setIsReady(true);
    }, []);

    useEffect(() => {

        if (hostMessage.startsWith("ROUNDEND")) {
            setHostMessage("");
            sendAnswer(gameMode.current);

            setTimeout(() => {
                sessionStorage.setItem("round", String(roundNumber.current + 1));
                navigate("/player/game/round/result");
            }, 500);
        } else if (hostMessage.startsWith("NEXTPLAYER-")) {
            setCurrentPlayer(hostMessage.split("-")[1]);
            sessionStorage.setItem("currentPlayer", hostMessage.split("-")[1]);
            setHostMessage("");
        }
    }, [hostMessage]);

    const prepareAnswer = (inputAnswer) => {
        answer.current = inputAnswer;
    }

    const sendAnswer = async (gameMode) => {
        if (gameMode === "NORMAL") {
            gameMode = "normal";
        }else if (gameMode === "LISTENING") {
            gameMode = "listening";
        }else {
            return;
        }

        console.log("Sending answer:", answer.current); // 로그 추가

        const response = await fetch(`/quiz/send/answer/${gameMode}?quizId=${quizId}&answer=${answer.current}&roomId=R${roomId.current}&playerName=${playerName.current}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error('Failed to send answer');
            return;
        }

        const data = await response.json();

        sessionStorage.setItem("isCorrect", data.correct);
        sessionStorage.setItem("playerScore", data.player_score);
    };

    return (
        <>
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    //일반 게임
                    <>
                        <div className="container-m">
                            <div className="loginBox-m">
                                <div className="player-header">
                                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                                    <PlayerTop playerName={playerName.current}/>
                                </div>
                                <div className="quiz-main">
                                    <h1 className="quiz-round">문제 {roundNumber.current}번</h1>
                                    <div className="quiz-box">
                                        <NormalButton prepareAnswer={prepareAnswer}/>
                                    </div>
                                </div>
                            </div>
                            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
                        </div>
                    </>
                ) : gameMode.current === "TWISTER" ? (
                    <>
                        <h1 className="quiz-round">문제 {roundNumber.current}번</h1>
                        <TwisterAnswer playerName={playerName.current}/>
                    </>
                ) : gameMode.current === "LISTENING" ? (
                    // 노래 맞추기
                    <ListeningText prepareAnswer={prepareAnswer}/>
                ) : gameMode.current === "POSE" ? (
                    // 포즈 따라하기
                    <h1>포즈 따라하기</h1>
                ) : (
                    <h1>오류 발생</h1>
                )
            ) : (
                <div></div>
            )}
        </>
    )
}

export default PlayerQuizPage;
