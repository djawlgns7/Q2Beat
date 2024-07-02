import React, {useEffect, useState} from "react";
import Q2B_back from "../../../image/background-image.png";
import '../../../css/Quiz/Twister/TwisterRoundResult.css'

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
                <div className="container-p">
                    <div className="twister-box">
                        <div className="twister-header">
                            <h2 className="twister-round">Round 1</h2>
                        </div>
                        <div className="twister-main">
                            <h1>{nextPlayer}님의 결과</h1><br/>
                            <h4>{answerString}</h4>
                            <h3>유사도: {score}%</h3>
                        </div>
                    </div>
                    <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default TwisterRoundResult;