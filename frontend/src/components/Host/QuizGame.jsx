import React, {useState, useEffect, useRef} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import Timer from "../quiz/Timer.jsx";
import Options from "../quiz/Options.jsx";

const QuizGame = () => {
    const {sendMessage, roomId, isConnected} = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);
    }, []);

    useEffect(() => {
        // 객체에서 값을 추출하여 사용
        setCurrentTime(setting.timeLimit);

        getQuiz(setting.category);
        if (currentTime !== -1) {
            startTimer(currentTime);
        }
    }, [setting]);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);
            alert("다음 문제로 이동");
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
                        <Options first={quiz.normal_first_choice} second={quiz.normal_second_choice}
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
                <h1>로딩안됨</h1>
            )}
        </>
    );
};

export default QuizGame;
