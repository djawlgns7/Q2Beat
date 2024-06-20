import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import React, {useEffect, useRef, useState} from "react";
import PlayerTop from "../quiz/PlayerTop.jsx";
import {useSocket} from "../context/SocketContext.jsx";
import NormalButton from "../quiz/NormalButton.jsx";
import {useNavigate} from "react-router-dom";
import Q2B from "../../image/Q2BEAT_2.png";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerQuizPage.css'
import Q2B_back from "../../image/Q2Beat_background.png";

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

            setTimeout(() => {
                navigate("/player/game/round/result");
            }, 500);
        }
    }, [hostMessage]);

    const prepareAnswer = (buttonAnswer) => {
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
            console.log("이상한 게임모드: " + gameMode);
            return;
        }

        const response = await fetch(`https://bit-two.com/q2beat/quiz/send/answer/${gameMode}?quizId=${quizId}&player_recent_answer=${answer.current}&room_id=R${roomId}&player_name=${playerName.current}`, {
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

        const data = await response.json();

        if (data.isCorrect === "true") {
            sessionStorage.setItem("isCorrect", data.correct);
        } else {
            sessionStorage.setItem("isCorrect", data.correct);
        }

        sessionStorage.setItem("playerScore", data.player_score);
    };

    return (
        <>
            <div className="player-header">
                <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                <PlayerTop playerName={playerName.current}/>
            </div>
            {isReady ? (
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
                    <div className="box-and-image">
                        <NormalButton prepareAnswer={prepareAnswer}/>
                        <img src={Q2B_back} alt="Q2B_back" className="backImage-p-quiz"/>
                    </div>
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

export default PlayerQuizPage;