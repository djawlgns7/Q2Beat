import {useSocket} from "../../context/SocketContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import mic_icon from '../../../image/free-icon-mic-2.png'
import '../../../css/Quiz/Twister/TwisterAnswer.css'
import TwisterRecordAndGrade from "./TwisterRecordAndGrade.jsx";

const TwisterAnswer = ({playerName, isRecording, setIsRecording, roundNumber, currentPlayer}) => {
    const {roomId, quizId} = useSocket();
    const [stage, setStage] = useState(false);
    const [questionString, setQuestionString] = useState("");

    useEffect(() => {

        setTimeout(() => {
            setStage(true);
            console.log("Stage set to true");
        }, 3000);
    }, []);

    useEffect(() => {
        getQuestionString();
    }, [quizId]);

    const getQuestionString = async () => {
        try {
            const response = await fetch(`http://localhost:8080/quiz/twister/get/quiz?quizId=${quizId}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }

            const data = await response.json();

            setQuestionString(data.twister_quiz);
            console.log('퀴즈: ', data.twister_quiz);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {stage ? (
                playerName === currentPlayer ? (
                    <>
                        <TwisterRecordAndGrade questionString={questionString} roomId={roomId} playerName={playerName}
                                               isRecording={isRecording} setIsRecording={setIsRecording}
                                               roundNumber={roundNumber}/>
                        <h3 className="turn-text">당신 차례입니다!</h3>
                    </>
                ) : (
                    <>
                        <img src={mic_icon} alt="mic_icon" className="mic-icon"/>
                        <h3 className="turn-text">{currentPlayer}님 차례입니다.</h3>
                    </>
                )
            ) : (
                <>
                    <img src={mic_icon} alt="mic_icon" className="mic-icon"/>
                    <h3 className="turn-text">{currentPlayer}님 차례입니다.</h3>
                </>
            )}
        </>
    )
}

export default TwisterAnswer;