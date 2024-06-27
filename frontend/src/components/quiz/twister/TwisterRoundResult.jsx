import {useEffect, useState} from "react";

const TwisterRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer] = useState("");
    const [score, setScore] = useState("");
    const [answerString, SetAnswerString] = useState("");
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const player = sessionStorage.getItem("nextPlayer");
        const answer = sessionStorage.getItem("answerString");
        SetAnswerString(answer);
        setNextPlayer(player);
    }, []);

    useEffect(() => {
        if (nextPlayer !== "") {
            getTwisterScore();
        }
    }, [nextPlayer]);

    const getTwisterScore = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/player/score?room_id=R${roomId}&player_name=${nextPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            const returnedScore = await response.text();

            setScore(String(returnedScore / 100));
            setIsFetched(true);

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            {isFetched === true ? (
                <>
                    <h1>{nextPlayer}님의 결과</h1>
                    <h4>{answerString}</h4>
                    <h3>유사도: {score}%</h3>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default TwisterRoundResult;