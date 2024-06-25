import {useEffect, useState} from "react";

const TwisterRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer] = useState("");
    const [score, setScore] = useState("");

    useEffect(() => {
        const player = sessionStorage.getItem("nextPlayer");
        setNextPlayer(player);
    }, []);

    useEffect(() => {
        if (nextPlayer) {
            getTwisterScore();
        }
    }, [nextPlayer]);

    const getTwisterScore = async () => {
        try {
            const response = await fetch(`/quiz/player/score?roomId=${roomId}&playerName=${nextPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setScore(await response.text());

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            <h1>{nextPlayer}님의 점수는 {score}점 입니다</h1>
        </>
    )
}

export default TwisterRoundResult;