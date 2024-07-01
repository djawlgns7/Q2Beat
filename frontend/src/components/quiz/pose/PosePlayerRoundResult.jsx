import React, {useEffect, useState} from "react";

const PosePlayerRoundResult = ({roomId}) => {
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [playerScore, setPlayerScore] = useState("0");

    useEffect(() => {
        setCurrentPlayer(sessionStorage.getItem("currentPlayer"));
    }, []);

    useEffect(() => {
        if (currentPlayer !== "") {
            getPoseScore();
        }
    }, [currentPlayer]);

    const getPoseScore = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/player/score?room_id=R${roomId}&player_name=${currentPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setPlayerScore(await response.text());

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <h1 className="twister-player-roundResult">{currentPlayer}님의 유사도는 <br/><br/>{playerScore / 100}% 입니다!</h1>
    )
}

export default PosePlayerRoundResult;