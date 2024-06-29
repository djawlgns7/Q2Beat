import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import { useNavigate } from "react-router-dom";
import '../../css/PC.css';
import '../../css/Quiz/RoundResult.css';
import backImage from "../../image/background-image.png";
import ListeningRoundResult from "../quiz/listening/ListeningRoundResult.jsx";
import NormalRoundResult from "../quiz/NormalRoundResult.jsx";
import TwisterRoundResult from "../quiz/twister/TwisterRoundResult.jsx";

const RoundResult = () => {
    const {sendMessage, roomId} = useSocket();
    const [setting, setSetting] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(-1);
    const [answer, setAnswer] = useState("");
    const isSettingChanged = useRef(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const quizAnswer = useRef("");
    const choices = useRef("");

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        choices.current = JSON.parse(sessionStorage.getItem("choices"));
        quizAnswer.current = sessionStorage.getItem('answer');
        setSetting(setting);
    }, []);

    useEffect(() => {
        if (!isSettingChanged.current) {
            isSettingChanged.current = true;
            return;
        }

        if (setting.gameMode != "LISTENING") {

            setCurrentTime(5);

            setTimeout(() => {
                startTimer(currentTime);
                setIsReady(true);
            }, 100);
        } else {
            setIsReady(true);
        }
    }, [setting]);

    const startTimer = (prevTime) => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

    }

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);
            sessionStorage.removeItem("answerString");

            if (setting.round > setting.maxRound) {
                sendMessage(`MESSAGE:${roomId}:HOST:GAMEEND`);

                navigate("/host/game/result");
            } else {
                sendMessage(`MESSAGE:${roomId}:HOST:NEXTROUND`);
                navigate("/host/game/count");
            }
        }
    }, [currentTime])


    return (
        <>
            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <div className="container-p">
                            <div className="contents-box-p">
                                <div className="quiz-main">
                                    <h2 className="round-answer">문제{Number(setting.round) - 1}</h2>
                                    <h4 className="round-timer">{currentTime}</h4>
                                </div>
                                <NormalRoundResult choices={choices.current} answer={quizAnswer.current}/>
                            </div>
                            <img src={backImage} alt="backImage" className="backImage-p"/>
                        </div>
                    </>

                ) : setting.gameMode === "TWISTER" ? (
                    <TwisterRoundResult roomId={roomId}/>
                ) : setting.gameMode === "LISTENING" ? (
                    // 노래 맞추기
                    <>
                        <ListeningRoundResult correctAnswer={quizAnswer.current}/>
                    </>
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
        </>
    )
}

export default RoundResult;