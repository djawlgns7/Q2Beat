import React, {useEffect, useRef, useState} from "react";
import Q2B_back from "../../../image/background-image.png";
import '../../../css/Moblie.css'
import '../../../css/Quiz/Pose/PosePlayerRoundResult.css'
import Q2B from "../../../image/Q2BEAT_2.png";
import PlayerTop from "../PlayerTop.jsx";
import likeIcon from "../../../image/free-icon-thumb-up.png";
import dislikeIcon from "../../../image/free-icon-dislike.png";

const PosePlayerRoundResult = ({roomId}) => {
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [playerScore, setPlayerScore] = useState("0");
    const playerName = useRef("");

    useEffect(() => {
        setCurrentPlayer(sessionStorage.getItem("currentPlayer"));
        playerName.current = sessionStorage.getItem("playerName");
    }, []);

    useEffect(() => {
        if (currentPlayer !== "") {
            getPoseScore();
        }
    }, [currentPlayer]);

    const getPoseScore = async () => {
        try {
            const response = await fetch(`https://bit-two.com/quiz/player/score?room_id=R${roomId}&player_name=${currentPlayer}`);

            if (!response.ok) {
                throw new Error('Failed to get player score');
            }

            setPlayerScore(await response.text());

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <div className="container-m">
            <div className="Box-m">
                <div className="player-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                    <PlayerTop playerName={playerName.current}/>
                </div>
                <div className="pose-container">
                    {playerScore / 100 >= 50 ? (
                        <div className="player-pose-result-image">
                            <img src={likeIcon} alt="likeIcon" className="like-ico2n" />
                            <h1 className="like-text">잘하셨어요!</h1>
                        </div>
                    ): (
                        <div className="player-pose-result-image">
                            <img src={dislikeIcon} alt="dislikeIcon" className="dislike-icon2"/>
                            <h1 className="dislike-text">아쉽습니다..</h1>
                        </div>
                    )}
                    <div className="pose-score-box">
                        <span>
                            <h2>{currentPlayer}님 유사도<br/>
                                <div className="pose-player-score">{playerScore / 100}%</div>
                            </h2>
                        </span>
                    </div>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    )
}

export default PosePlayerRoundResult;