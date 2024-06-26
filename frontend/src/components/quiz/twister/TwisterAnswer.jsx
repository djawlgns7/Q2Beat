import {useSocket} from "../../context/SocketContext.jsx";
import {useEffect, useRef, useState} from "react";
import TwisterRecordAndGrade from "./TwisterRecordAndGrade.jsx";

const TwisterAnswer = ({playerName}) => {
    const {roomId, quizId} = useSocket();
    const [stage, setStage] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [questionString, setQuestionString] = useState("");
    const isQuizValid = useRef(false);

    useEffect(() => {

        setTimeout(() => setCurrentPlayer(sessionStorage.getItem("currentPlayer")), 300);

        setTimeout(() => {
            setStage(true);
            console.log("Stage set to true");
        }, 3000);
    }, []);

    useEffect(() => {
        if (isQuizValid.current) {
            getQuestionString();
        } else {
            isQuizValid.current = true;
        }
    }, [quizId]);

    const getQuestionString = async () => {
        try {
            const response = await fetch(`/quiz/twister/get/quiz?quizId=${quizId}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }

            const data = await response.json();

            setQuestionString(data.twister_quiz);
            console.log('퀴즈: ', data.twister_quiz);
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            {stage ? (
                playerName === currentPlayer ? (
                    <>
                        <TwisterRecordAndGrade questionString={questionString} roomId={roomId} playerName={playerName}/>
                        <h3>당신 차례입니다!</h3>
                    </>
                ) : (
                    <>
                        <h3>{currentPlayer}님 차례입니다.</h3>
                    </>
                )
            ) : (
                <h1>{currentPlayer}님 차례입니다!</h1>
            )}
        </>
    )
}

export default TwisterAnswer;
