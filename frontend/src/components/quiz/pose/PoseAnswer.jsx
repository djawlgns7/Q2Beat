import {useSocket} from "../../context/SocketContext.jsx";
import React, {useEffect, useRef, useState} from "react";
import mic_icon from '../../../image/free-icon-mic.png'
import Q2B_back from "../../../image/Q2Beat_background.png";
import PoseShootAndGrade from "./PoseShootAndGrade.jsx";

const PoseAnswer = ({playerName, roundNumber}) => {
    const {roomId, quizId} = useSocket();
    const [stage, setStage] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [poseQuiz, setPoseQuiz] = useState("");

    useEffect(() => {

        setTimeout(() => setCurrentPlayer(sessionStorage.getItem("currentPlayer")), 300);

        setTimeout(() => {
            setStage(true);
            console.log("Stage set to true");
        }, 3000);
    }, []);

    useEffect(() => {
        if (quizId !== "") {
            getPoseQuiz();
        }
    }, [quizId]);

    const getPoseQuiz = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/pose/get/quiz?quizId=${quizId}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }

            const data = await response.json();

            setPoseQuiz(data);
            console.log('포즈 이름: ', data.pose_name);
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            {stage ? (
                playerName === currentPlayer ? (
                    <>
                        <PoseShootAndGrade poseQuiz={poseQuiz} roomId={roomId} playerName={playerName}
                                               roundNumber={roundNumber}/>
                        <h3>당신 차례입니다!</h3>
                    </>
                ) : (
                    <>
                        <img src={mic_icon} alt="mic_icon" className="mic-icon"/>
                        <h3>{currentPlayer}님 차례입니다.</h3>
                    </>
                )
            ) : (
                <>
                    <img src={mic_icon} alt="mic_icon" className="mic-icon"/>
                    <h3>{currentPlayer}님 차례입니다.</h3>
                </>
            )}
        </>
    )
}

export default PoseAnswer;