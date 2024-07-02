import React, {useEffect, useRef, useState} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import { useNavigate } from "react-router-dom";
import Timer from "../quiz/Timer.jsx";
import NormalOptions from "../quiz/NormalOptions.jsx";
import ListeningQuiz from "../quiz/listening/ListeningQuiz.jsx";
import '../../css/PC.css';
import '../../css/Host/QuizGame.css';
import Q2B_back from "../../image/background-image.png";
import TwisterQuiz from "../quiz/twister/TwisterQuiz.jsx";
import PoseQuiz from "../quiz/pose/PoseQuiz.jsx";

const QuizGame = () => {
    const {sendMessage, roomId, hostMessage, setHostMessage, clientMessage, setClientMessage} = useSocket();
    const [setting, setSetting] = useState('');
    const [quiz, setQuiz] = useState('');
    const [currentTime, setCurrentTime] = useState(-1);
    const [isReady, setIsReady] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [usedQuizIds, setUsedQuizIds] = useState([]);
    const [nextPlayer, setNextPlayer] = useState("");
    const intervalRef = useRef(null);
    const isRecording = useRef(false);
    const navigate = useNavigate();

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
            getQuizListening(setting.category);
        } else if (setting.gameMode === "TWISTER") {
            getNextPlayer();
            getQuizTwister();
        } else if (setting.gameMode === "POSE") {
            getNextPlayer();
            getQuizPose();
        }
        setCurrentTime(setting.timeLimit);
    }, [setting]);

    useEffect(() => {
        setTimeout(() => {
            if (isTimeout === true) {
                clearInterval(intervalRef.current);

                sendMessage(`MESSAGE:${roomId}:HOST:ROUNDEND`);

                if (!isRecording.current && setting.gameMode !== "POSE") {
                    setting.round = Number.parseInt(setting.round) + 1;
                    sessionStorage.setItem('setting', JSON.stringify(setting));

                    navigate("/host/game/round/result");
                }
            }
        }, 1500)
    }, [isTimeout])

    useEffect(() => {
        if (clientMessage === "RECORDSTART") {
            isRecording.current = true;
        } else if (clientMessage === "RECORDSTOP") {
            isRecording.current = false;
        } else if (clientMessage === "ROUNDEND") {
            setting.round = Number.parseInt(setting.round) + 1;
            sessionStorage.setItem('setting', JSON.stringify(setting));

            navigate("/host/game/round/result");
        } else if (clientMessage.startsWith("ANSWER-")) {
            const answerString = clientMessage.split("-")[1];
            sessionStorage.setItem("answerString", answerString);
        }

        setClientMessage("");
    }, [clientMessage])

    useEffect(() => {
        if ((hostMessage.startsWith("ROUNDEND") || hostMessage.startsWith("ALL_SKIPPED")) && setting.gameMode === "LISTENING") {
            console.log("Received ROUNDEND message");
            setHostMessage("");
            navigate("/host/game/round/result");
        }
    }, [hostMessage, navigate, setHostMessage]);



    const getQuizNormal = async (category) => {
        const response = await fetch(`http://bit-two.com:8080/quiz/get/normal?category=${category}&roomId=${roomId}`, {
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

    const getQuizListening = async (category) => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/get/listening?roomId=${roomId}&category=${category}`, {
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
            sessionStorage.setItem("currentListeningQuiz", JSON.stringify(data)); // 저장
            sendMessage(`MESSAGE:${roomId}:QUIZID:${data.listening_id}`);
            setIsReady(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getQuizTwister = async (category) => {
        const response = await fetch(`http://bit-two.com:8080/quiz/twister/get?level=${setting.level}&roomId=${roomId}`, {
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
            const response = await fetch(`http://bit-two.com:8080/quiz/player/available?roomId=${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player rank');
            }

            const data = await response.text();
            setNextPlayer(data);
            console.log("다음 플레이어 차례: " + data);
            sendMessage(`MESSAGE:${roomId}:HOST:NEXTPLAYER-${data}`);
            sessionStorage.setItem("nextPlayer", data);

        } catch (error) {
            console.error('Error fetching player rank:', error);
        }
    }

    const getQuizPose = async (category) => {
        const response = await fetch(`http://bit-two.com:8080/quiz/pose/get?level=${setting.level}&roomId=${roomId}`, {
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

        sendMessage(`MESSAGE:${roomId}:QUIZID:${data.pose_id}`);
        setIsReady(true);
    };


    return (
        <>
            {isReady ? (
                setting.gameMode === "NORMAL" ? (
                    <div className="container-p">
                        <div className="contents-box-p">
                            <div className="quiz-main">
                                <h2 className="quiz-title">문제 {setting.round}</h2>
                                <h3 className="quiz-text">{quiz.normal_quiz}</h3>
                                <Timer time={currentTime} onTimeout={handleTimeout}/>
                            </div>
                            <div className="answer-section">
                                <NormalOptions first={quiz.normal_first_choice} second={quiz.normal_second_choice}
                                               third={quiz.normal_third_choice} fourth={quiz.normal_fourth_choice}/>
                            </div>
                        </div>
                        <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                    </div>

                ) : setting.gameMode === "TWISTER" ? (
                    <>
                        <TwisterQuiz quiz={quiz} nextPlayer={nextPlayer} time={currentTime} onTimeout={handleTimeout}/>
                    </>
                ) : setting.gameMode === "LISTENING" ? (
                    <>
                        <ListeningQuiz quiz={quiz}/>
                    </>
                ) : setting.gameMode === "POSE" ? (
                    <>
                        <h2 className="quiz-title">문제 {setting.round}</h2>
                        <PoseQuiz quiz={quiz} nextPlayer={nextPlayer}/>
                    </>
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