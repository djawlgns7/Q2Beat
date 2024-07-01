import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import Q2B_back from "../../../image/Q2Beat_background.png";

const PoseRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer, image] = useState("");
    const [score, setScore] = useState("");
    const [answerString, SetAnswerString] = useState("");
    const [isFetched, setIsFetched] = useState(false);
    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        const player = sessionStorage.getItem("nextPlayer");
        //const answer = sessionStorage.getItem("answerString");
        //SetAnswerString(answer);
        setNextPlayer(player);
    }, []);

    useEffect(() => {
        if (nextPlayer !== "") {
            getPoseScore();
        }
    }, [nextPlayer]);

    const getPoseScore = async () => {
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
                            <div className="circle-header-listening">
                                {colors.map((color, index) => (
                                    <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                                ))}
                            </div>
                            <h2 className="twister-round">Round 1</h2>
                        </div>
                        <div className="twister-main">
                            <h1>{nextPlayer}님의 결과</h1><br/>
                            <img src={image} alt="Received" style={{width: '300px', height: 'auto'}}/>
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

export default PoseRoundResult;