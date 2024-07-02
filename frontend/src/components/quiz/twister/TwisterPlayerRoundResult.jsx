import React, {useEffect, useState} from "react";
import '../../../css/Quiz/Twister/TwisterPlayerRoundResult.css'
import backImage from '../../../image/background-image.png'
import Q2B_back from "../../../image/background-image.png";

const TwisterPlayerRoundResult = ({roomId}) => {
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [playerScore, setPlayerScore] = useState("0");

    useEffect(() => {
        setCurrentPlayer(sessionStorage.getItem("currentPlayer"));
    }, []);

    useEffect(() => {
        if (currentPlayer !== "") {
            getTwisterScore();
        }
    }, [currentPlayer]);

    const getTwisterScore = async () => {
        try {
            const response = await fetch(`https://bit-two.com/quiz/player/score?room_id=R${roomId}&player_name=${currentPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setPlayerScore(await response.text());

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <div className="container-m">
            <div className="Box-m">
                <h1 className="twister-player-roundResult">{currentPlayer}님의 유사도는 {playerScore / 100}% 입니다!</h1>
            </div>
            <img src={backImage} alt="backImage" className="backImage-m"/>
        </div>
    )
}

export default TwisterPlayerRoundResult;