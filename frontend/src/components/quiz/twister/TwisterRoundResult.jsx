import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import Q2B_back from "../../../image/Q2Beat_background.png";

const TwisterRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer] = useState("");
    const [score, setScore] = useState("");
    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

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
                <div className="twister-box">
                    <div className="twister-header">
                        <div className="circle-header-listening">
                            {colors.map((color, index) => (
                                <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                            ))}
                        </div>
                        <h2 className="twister-round">Round 1</h2>
                    </div>
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