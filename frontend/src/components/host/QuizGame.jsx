import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext.jsx';
import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import { useNavigate } from "react-router-dom";
import ListeningQuiz from "../quiz/ListeningQuiz.jsx";
import '../../css/PC.css';
import '../../css/Host/QuizGame.css';
import Q2B_back from "../../image/Q2Beat_background.png";

const QuizGame = () => {
    const { sendMessage, roomId } = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [usedQuizIds, setUsedQuizIds] = useState([]);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        const settingString = sessionStorage.getItem('setting');
        if (settingString) {
            const setting = JSON.parse(settingString);
            setSetting(setting);
        }
    }, []);

    useEffect(() => {
        if (setting === "") return;

        if (setting.gameMode === "NORMAL") {
            getQuizNormal(setting.category);
        } else if (setting.gameMode === "LISTENING") {
            getQuizListening();
        }
        setCurrentTime(setting.timeLimit);
    }, [setting]);

    useEffect(() => {
        if (currentTime <= 0) {
            clearInterval(intervalRef.current);
            setIsTimeout(true);
        }
    }, [currentTime]);

    useEffect(() => {
        if (isTimeout) {
            setting.round = Number.parseInt(setting.round) + 1;
            sessionStorage.setItem('setting', JSON.stringify(setting));
            sendMessage(`MESSAGE:${roomId}:HOST:ROUNDEND`);

            setTimeout(() => navigate("/host/game/round/result"), 500);
        }
    }, [isTimeout]);

    const getQuizNormal = async (category) => {
        const response = await fetch(`/quiz/get/normal?category=${category}&roomId=${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
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
            console.log("Quiz Listening Data:", data);

            if (usedQuizIds.includes(data.listening_id)) {
                await getQuizListening();
                return;
            }

            setQuiz(data);
            setUsedQuizIds([...usedQuizIds, data.listening_id]);
            sessionStorage.setItem("answer", data.listening_answer);
            sendMessage(`MESSAGE:${roomId}:QUIZID:${data.listening_id}`);
            setIsReady(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    setIsTimeout(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleTimeout = () => {
        setIsTimeout(true);
    };

    useEffect(() => {
        if (isReady && currentTime > 0) {
            startTimer();
        }
    }, [isReady, currentTime]);

    return (
        <>
            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    <div className="game-container">
                        <div className="quiz-section">
                            <div className="circle-header-game">
                                {colors.map((color, index) => (
                                    <div key={index} className="circle-game" style={{ backgroundColor: color }}></div>
                                ))}
                            </div>
                            <h2 className="quiz-title">문제 {setting.round}</h2>
                            <h3 className="quiz-text">{quiz.normal_quiz}</h3>
                            <Timer time={currentTime} onTimeout={handleTimeout} />
                        </div>
                        <div className="answer-section">
                            <NormalOptions first={quiz.normal_first_choice} second={quiz.normal_second_choice} third={quiz.normal_third_choice} fourth={quiz.normal_fourth_choice} />
                        </div>
                        <img src={Q2B_back} alt="Q2B_back" className="backImage-p" />
                    </div>
                ) : setting.gameMode === "SINGING" ? (
                    <h1>노래부르기</h1>
                ) : setting.gameMode === "LISTENING" ? (
                    <>
                        <h1>문제 {setting.round}</h1>
                        <Timer time={currentTime} />
                        <ListeningQuiz quiz={quiz} />
                    </>
                ) : setting.gameMode === "POSE" ? (
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