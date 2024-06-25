import {useEffect, useState} from "react";

const TwisterRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer] = useState("");
    const [score, setScore] = useState("");
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const player = sessionStorage.getItem("nextPlayer");
        setNextPlayer(player);
    }, []);

    useEffect(() => {
        if (nextPlayer !== "") {
            getTwisterScore();
        }
    }, [nextPlayer]);

    const getTwisterScore = async () => {
        try {
            const response = await fetch(`/quiz/player/score?room_id=R${roomId}&player_name=${nextPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setScore(await response.text());
            setIsFetched(true);

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            {isFetched === true ? (
                <h1>{nextPlayer}님의 점수는 {score}점 입니다</h1>
            ) : (
                <></>
            )}
        </>
    )
}

export default TwisterRoundResult;