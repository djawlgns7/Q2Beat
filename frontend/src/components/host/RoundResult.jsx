import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import { useNavigate } from "react-router-dom";
import '../../css/PC.css';
import '../../css/Quiz/RoundResult.css';
import Q2B_back from "../../image/Q2Beat_background.png";
import ListeningRoundResult from "../quiz/ListeningRoundResult.jsx";
import NormalRoundResult from "../quiz/NormalRoundResult.jsx";

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

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        quizAnswer.current = sessionStorage.getItem('answer');
        setSetting(setting);
    }, []);

    useEffect(() => {
        if (!isSettingChanged.current) {
            isSettingChanged.current = true;
            return;
        }

        setCurrentTime(5);

        setTimeout(() => {
            getAnswerNumber(setting.gameMode);
            startTimer();
        }, 1000);
    }, [setting]);

    const getAnswerNumber = async (gameMode) => {
        const response = await fetch(`/quiz/get/round/result/${gameMode.toLowerCase()}?roomId=${roomId}&answer=${quizAnswer.current}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // 오류 처리
            console.error('Failed to fetch answer number');
            return;
        }

        const data = await response.json();
        setAnswer(data);
        setIsReady(true);
    }

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 10000);

    }

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);

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
                        <div className="round-container">
                            <div className="round-box">
                                <div className="circle-header-game">
                                    {colors.map((color, index) => (
                                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                                    ))}
                                </div>
                                <h2 className="round-answer">문제{Number(setting.round) - 1}</h2>
                                <h4 className="round-timer">{currentTime}</h4>
                            </div>
                            <NormalRoundResult answerNumber={answer} answer={quizAnswer.current}/>
                            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                        </div>
                    </>
                ) : setting.gameMode === "SINGING" ? (
                    // 노래부르기
                    <h1>노래부르기</h1>
                ) : setting.gameMode === "LISTENING" ? (
                    // 노래 맞추기
                    <>
                        <div className="round-container">
                            <div className="round-box">
                                <div className="circle-header-game">
                                    {colors.map((color, index) => (
                                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                                    ))}
                                </div>
                                <h2 className="round-answer">문제{Number(setting.round) - 1}</h2>
                                <h4 className="round-timer">{currentTime}</h4>
                            </div>
                            <ListeningRoundResult correctAnswer={answer} correctPlayers={correctPlayers}/>
                            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                        </div>
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