import React, {useEffect, useState} from "react";
import Q2B_back from "../../../image/background-image.png";
import '../../../css/Quiz/Twister/TwisterRoundResult.css'

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
            <div className="container-p">
                <div className="contents-box-p">
                    <h2 className="twister-round">Round 1</h2>
                    <div className="twister-main">
                        <h1 className="twister-roundResult">{nextPlayer}님의 점수<br/><br/>{score}%</h1>
                    </div>
                </div>
                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
            </div>
        </>
    )
}

export default TwisterRoundResult;