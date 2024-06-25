import React, {useEffect, useState} from "react";

const TwisterPlayerRoundResult = ({roomId}) => {
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [playerScore, setPlayerScore] = useState("");

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
            const response = await fetch(`/quiz/player/score?room_id=R${roomId}&player_name=${currentPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setPlayerScore(await response.text());

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <h1 className="twister-player-roundResult">{currentPlayer}님의 점수는 <br/><br/>{playerScore}점 입니다!</h1>
    )
}

export default TwisterPlayerRoundResult;