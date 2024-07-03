import React, {useEffect, useState} from "react";
import Q2B_back from "../../../image/background-image.png";
import '../../../css/PC.css'
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
            const response = await fetch(`https://bit-two.com/quiz/player/score?room_id=R${roomId}&player_name=${nextPlayer}`);

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
                    <div className="contents-box-p">
                        <div className="twister-main">
                            <h2 className="twister-round">Round 1</h2>
                            <h3 className="twister-player-result">{nextPlayer}님의 결과</h3>
                            <div className="twister-text-result-box">
                                <div className="twister-text-result">
                                    {answerString}
                                </div>
                            </div>
                            <h3 className="twister-percent">유사도: {score}%</h3>
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