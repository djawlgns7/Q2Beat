import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import Q2B_back from "../../../image/background-image.png";
import axios from "axios";
import '../../../css/PC.css'
import '../../../css/Quiz/Pose/PoseRoundResult.css'

const PoseRoundResult = ({roomId}) => {

    const [nextPlayer, setNextPlayer] = useState("");
    const [score, setScore] = useState("");
    const [isFetched, setIsFetched] = useState(false);
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const player = sessionStorage.getItem("nextPlayer");
        setNextPlayer(player);
    }, []);

    useEffect(() => {
        if (nextPlayer !== "") {
            getPoseScore();
            fetchImage();
        }
    }, [nextPlayer]);

    const getPoseScore = async () => {
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

    const fetchImage = async () => {
        try {
            const response = await fetch(`https://bit-two.com/quiz/pose/image/get?roomId=R${roomId}&playerName=${nextPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const data = await response.text();
            setImage(`data:image/jpeg;base64,${data}`);
        } catch (error) {
            console.error("Error fetching image:", error);
            setError("Failed to load image");
        }
    };

    return (
        <>
            {isFetched === true ? (
                <div className="container-p">
                    <div className="contents-box-p">
                        <div className="pose-main">
                            <h2 className="pose-round">Round 1</h2>
                            {error ? <p>{error}</p> : (image ?
                                <img className="pose-result-image" src={image} alt="Fetched from DB"/> :
                                <p>Loading...</p>)}
                            <h3 className="pose-percent">유사도: {score}%</h3>
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