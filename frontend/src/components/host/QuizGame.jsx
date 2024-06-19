import React, {useEffect, useRef, useState} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import {useNavigate} from "react-router-dom";
import ListeningQuiz from "../quiz/ListeningQuiz.jsx";
import '../../css/PC.css'
import '../../css/Host/QuizGame.css'
import Q2B_back from "../../image/Q2Beat_background.png";

const QuizGame = () => {
    const {sendMessage, roomId} = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);
    }, []);

    useEffect(() => {
        if (setting === "") {
            return;
        }

        if (setting.gameMode === "NORMAL") {
            getQuizNormal(setting.category);
        } else if (setting.gameMode === "LISTENING") {
            getQuizListening();
        }
        setCurrentTime(setting.timeLimit);
    }, [setting]);

    useEffect(() => {
        setTimeout(() => {
            if (isTimeout === true) {
                clearInterval(intervalRef.current);

                setting.round = Number.parseInt(setting.round) + 1;
                sessionStorage.setItem('setting', JSON.stringify(setting));
                sendMessage(`MESSAGE:${roomId}:HOST:ROUNDEND`);

                setTimeout(() => navigate("/host/game/round/result"), 500);
            }
        }, [currentTime])
    })
    const getQuizNormal = async (category) => {
        const response = await fetch(`/quiz/get/normal?category=${category}&roomId=${roomId}`, {
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
        sessionStorage.setItem("answer", data.normal_answer);
        sendMessage(`MESSAGE:${roomId}:QUIZID:${data.normal_id}`);
        setIsReady(true);
    };

    const getQuizListening = async () => {
        try {
            const response = await fetch(`/quiz/get/listening?roomId=${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch quiz information');
            }

            const data = await response.json();
            setQuiz(data);
            sessionStorage.setItem("answer", data.listening_answer);
            sendMessage(`MESSAGE:${roomId}:QUIZID:${data.lyric_id}`);
            setIsReady(true);
        } catch (error) {
            console.error('Error:', error);
        }
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
        const handleTimeout = () => {
            setIsTimeout(true);
        }

        return (
            <>
                {isReady ? (
                    setting.gameMode === "NORMAL" ? (
                        // 일반 게임
                        <>
                            <div className="game-container">
                                <div className="quiz-section">
                                    <div className="circle-header-game">
                                        {colors.map((color, index) => (
                                            <div key={index} className="circle-game"
                                                 style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                    <h2 className="quiz-title">문제 {setting.round}</h2>
                                    <h3 className="quiz-text">{quiz.normal_quiz}</h3>
                                    <Timer time={currentTime - 1} onTimeout={handleTimeout}/>
                                </div>
                                <div className="answer-section">
                                    <NormalOptions first={quiz.normal_first_choice}
                                                   second={quiz.normal_second_choice}
                                                   third={quiz.normal_third_choice}
                                                   fourth={quiz.normal_fourth_choice}/>
                                </div>
                                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                            </div>
                        </>
                    ) : setting.gameMode === "SINGING" ? (
                        // 노래부르기
                        <h1>노래부르기</h1>
                    ) : setting.gameMode === "LISTENING" ? (
                        // 노래 맞추기
                        <>
                            <h1>문제 {setting.round}</h1>
                            <Timer time={currentTime}/>
                            <ListeningQuiz quiz={quiz}/>
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
        );
    };
};
export default QuizGame