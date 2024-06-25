import React, {useEffect, useRef, useState} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import {useNavigate} from "react-router-dom";
import ListeningQuiz from "../quiz/ListeningQuiz.jsx";
import '../../css/PC.css';
import '../../css/Host/QuizGame.css';
import Q2B_back from "../../image/Q2Beat_background.png";
import TwisterQuiz from "../quiz/twister/TwisterQuiz.jsx";

const QuizGame = () => {
    const {sendMessage, roomId} = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [usedQuizIds, setUsedQuizIds] = useState([]);
    const [nextPlayer, setNextPlayer] = useState("");
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
        } else if (setting.gameMode === "NORMAL") {
            getQuizNormal(setting.category);
        } else if (setting.gameMode === "LISTENING") {
            getQuizListening();
        } else if (setting.gameMode === "TWISTER") {
            getNextPlayer();
            getQuizTwister();
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

                navigate("/host/game/round/result");
            }
        }, 1500)
    }, [isTimeout])

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
        sessionStorage.setItem("choices", JSON.stringify({
            "first": data.normal_first_choice,
            "second": data.normal_second_choice,
            "third": data.normal_third_choice,
            "fourth": data.normal_fourth_choice
        }));
        sendMessage(`MESSAGE:${roomId}:QUIZID:${data.normal_id}`);
        setIsReady(true);
    };

    const handleTimeout = () => {
        setIsTimeout(true);
    }

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
            setUsedQuizIds(prevUsedQuizIds => [...prevUsedQuizIds, data.listening_id]);
            sessionStorage.setItem("answer", data.listening_answer);
            sendMessage(`MESSAGE:${roomId}:QUIZID:${data.listening_id}`);
            setIsReady(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getQuizTwister = async (category) => {
        const response = await fetch(`/quiz/twister/get?level=${setting.level}&roomId=${roomId}`, {
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

        sendMessage(`MESSAGE:${roomId}:QUIZID:${data.twister_id}`);
        setIsReady(true);
    };

    const getNextPlayer = async () => {
        try {
            const response = await fetch(`/quiz/player/available?roomId=${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player rank');
            }

            const data = await response.text();
            setNextPlayer(data);
            console.log("다음 플레이어 차례: " + data);
            sendMessage(`MESSAGE:${roomId}:HOST:${data}`);
            sessionStorage.setItem("nextPlayer", nextPlayer);

        } catch (error) {
            console.error('Error fetching player rank:', error);
        }
    }


    return (
        <>
            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    <div className="game-container">
                        <div className="quiz-section">
                            <div className="circle-header-game">
                                {colors.map((color, index) => (
                                    <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                                ))}
                            </div>
                            <h2 className="quiz-title">문제 {setting.round}</h2>
                            <h3 className="quiz-text">{quiz.normal_quiz}</h3>
                            <Timer time={currentTime} onTimeout={handleTimeout}/>
                        </div>
                        <div className="answer-section">
                            <NormalOptions first={quiz.normal_first_choice} second={quiz.normal_second_choice}
                                           third={quiz.normal_third_choice} fourth={quiz.normal_fourth_choice}/>
                        </div>
                        <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                    </div>
                ) : setting.gameMode === "TWISTER" ? (
                    <>
                        <h2 className="quiz-title">문제 {setting.round}</h2>
                        <TwisterQuiz quiz={quiz} nextPlayer={nextPlayer} time={currentTime} onTimeout={handleTimeout}/>
                    </>
                ) : setting.gameMode === "LISTENING" ? (
                    <>
                        <ListeningQuiz quiz={quiz}/>
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