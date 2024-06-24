import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import React, { useEffect, useRef, useState } from "react";
import PlayerTop from "../quiz/PlayerTop.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import NormalButton from "../quiz/NormalButton.jsx";
import { useNavigate } from "react-router-dom";
import ListeningText from "../quiz/listening/ListeningText.jsx";

const PlayerQuizPage = () => {
    const { sendMessage, hostMessage, setHostMessage, quizId } = useSocket();
    const [isReady, setIsReady] = useState(false);
    const gameMode = useRef("");
    const playerName = useRef("");
    const answer = useRef("");
    const navigate = useNavigate();
    const roundNumber = useRef("");
    const roomId = useRef("");

    useEffect(() => {
        playerName.current = sessionStorage.getItem("playerName");
        gameMode.current = sessionStorage.getItem("gameMode");
        roundNumber.current = sessionStorage.getItem("round");
        roomId.current = sessionStorage.getItem("roomId");

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (hostMessage === "ROUNDEND") {
            console.log(hostMessage);
            setHostMessage("");
            sendAnswer(gameMode.current);

            setTimeout(() => {
                sessionStorage.setItem("round", roundNumber.current + 1);
                navigate("/player/game/round/result");
            }, 500);
        }
    }, [hostMessage]);

    const prepareAnswer = (inputAnswer, isCorrect) => {
        answer.current = inputAnswer;
        sessionStorage.setItem("isCorrect", isCorrect);
    };

    const sendAnswer = async (gameMode) => {
        if (gameMode === "NORMAL") {
            gameMode = "normal";
        } else if (gameMode === "SINGING") {
            gameMode = "singing";
        } else if (gameMode === "LISTENING") {
            gameMode = "listening";
        } else if (gameMode === "POSE") {
            gameMode = "pose";
        } else {
            console.log("이상한 게임모드: " + gameMode);
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
            <PlayerTop playerName={playerName.current} />
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <NormalButton prepareAnswer={prepareAnswer} />
                    </>
                ) : gameMode.current === "SINGING" ? (
                    // 노래부르기
                    <h1>노래부르기</h1>
                ) : gameMode.current === "LISTENING" ? (
                    // 노래 맞추기
                    <ListeningText
                        quizId={quizId}
                        roomId={roomId.current}
                        playerName={playerName.current}
                        prepareAnswer={prepareAnswer}
                    />
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

export default PlayerQuizPage;
