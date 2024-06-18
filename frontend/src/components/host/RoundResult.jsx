import {useSocket} from "../context/SocketContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import NormalRoundResult from "../quiz/NormalRoundResult.jsx";
import {useNavigate} from "react-router-dom";
import Timer from "../quiz/Timer.jsx";

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

        setCurrentTime(10);

        setTimeout(() => {
            getAnswerNumber(setting.gameMode);
            startTimer(currentTime);
        }, 50);
    }, [setting]);

    const getAnswerNumber = async (gameMode) => {
        const response = await fetch(`/quiz/get/round/result/${gameMode.toLowerCase()}?roomId=${roomId}`, {
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
                        <h1>문제{Number(setting.round) - 1} 결과</h1>
                        <Timer time={currentTime}/>
                        <NormalRoundResult answerNumber={answer} answer={quizAnswer.current}/>
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
        </>
    )
}

export default RoundResult;