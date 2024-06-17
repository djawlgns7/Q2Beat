import React, {useEffect, useRef, useState} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import {useNavigate} from "react-router-dom";

const QuizGame = () => {
    const {sendMessage, roomId, isConnected} = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const isSettingChanged = useRef(false);

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);
    }, []);

    useEffect(() => {
        if (!isSettingChanged.current) {
            isSettingChanged.current = true;
            return;
        }

        // 객체에서 값을 추출하여 사용
        setCurrentTime(setting.timeLimit);

        getQuiz(setting.category);
        startTimer(currentTime);
    }, [setting]);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);

            if (setting.round >= setting.maxRound) {
                sendMessage(`MESSAGE:${roomId}:HOST:GAMEEND`);

                navigate("/quiz-result");
            } else {
                setting.round = Number.parseInt(setting.round) + 1;
                sessionStorage.setItem('setting', JSON.stringify(setting));
                sendMessage(`MESSAGE:${roomId}:HOST:ROUNDEND`);

                navigate("/quiz-count");
            }
        }
    }, [currentTime])

    const getQuiz = async (category) => {
        const response = await fetch(`/quiz/getQuizNormal?category=${category}&roomId=${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // 오류 처리
            console.error('Failed to fetch quiz information');
            return;
        }

        const data = await response.json();
        setQuiz(data);
        sendMessage(`MESSAGE:${roomId}:QUIZID:${data.normal_id}`);
        setIsReady(true);
    };

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

    const sendAnswer = (m) => {
        if (isConnected && m.trim() && roomId) {
            const message = "(Host):" + m;
            sendMessage("MESSAGE:" + roomId + ":" + message);
        }
    };

    return (
        <>
            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    // 일반 게임
                    <>
                        <h1>문제 {setting.round}</h1>
                        <h3>{quiz.normal_quiz}</h3>
                        <Timer time={currentTime}/>
                        <NormalOptions first={quiz.normal_first_choice} second={quiz.normal_second_choice}
                                       third={quiz.normal_third_choice}
                                       fourth={quiz.normal_fourth_choice}/>
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
    );
};

export default QuizGame;