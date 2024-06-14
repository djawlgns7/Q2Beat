import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import React, {useEffect, useRef, useState} from "react";
import PlayerTop from "../quiz/PlayerTop.jsx";
import {useSocket} from "../context/SocketContext.jsx";
import NormalButton from "../quiz/NormalButton.jsx";
import {useNavigate} from "react-router-dom";

const PlayerQuizPage = () => {
    const {sendMessage, roomId, hostMessage, setHostMessage, quizId} = useSocket();
    const [isReady, setIsReady] = useState(false);
    const gameMode = useRef("");
    const playerName = useRef("");
    const answer = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        playerName.current = sessionStorage.getItem("playerName");
        gameMode.current = sessionStorage.getItem("gameMode");

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (hostMessage === "ROUNDEND") {
            console.log(hostMessage);
            setHostMessage("");
            sendAnswer(gameMode.current);
            navigate("/player-count");
        } else if (hostMessage === "GAMEEND") {
            console.log(hostMessage);
            setHostMessage("");
            sendAnswer(gameMode.current);
            navigate("/player-result");
        }
    }, [hostMessage]);

    const prepareAnswer = (buttonAnswer) => {
        alert(buttonAnswer);
        answer.current = buttonAnswer;
    }

    const sendAnswer = async (gameMode) => {
        if (gameMode === "NORMAL") {
            gameMode = "normal";
        } else if (gameMode === "SINGING") {
            gameMode = "singing";
        } else if (gameMode === "LYRIC") {
            gameMode = "lyric";
        } else if (gameMode === "POSE") {
            gameMode = "pose";
        } else {
            console.log("이상한 게임모드");
            return;
        }

        const response = await fetch(`/quiz/send/${gameMode}?quizId=${quizId}&player_recent_answer=${answer.current}&room_id=R${roomId}&player_name=${playerName.current}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // 오류 처리
            console.error('Failed to send answer');
            return;
        }

        const data = await response.text();

        if (data === "true") {
            sessionStorage.setItem("isCorrect", data);
            console.log("정답입니다");
        } else {
            sessionStorage.setItem("isCorrect", data);
            console.log("오답입니다");
        }
    };

    return (
        <>
            <PlayerTop playerName={playerName.current}/>
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <NormalButton prepareAnswer={prepareAnswer}/>
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
                    <h1>로딩중</h1>
                </>
            )}
        </>
    )
}

export default PlayerQuizPage;