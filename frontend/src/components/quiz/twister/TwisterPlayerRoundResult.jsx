import React, {useEffect, useState} from "react";
import '../../../css/Quiz/Twister/TwisterPlayerRoundResult.css'
import backImage from '../../../image/background-image.png'
import '../../../css/Moblie.css'
import PlayerTop from "../PlayerTop.jsx";
import Q2B from '../../../image/Q2BEAT_2.png'
import likeIcon from '../../../image/free-icon-thumb-up.png'
import dislikeIcon from '../../../image/free-icon-dislike.png'

const TwisterPlayerRoundResult = ({roomId}) => {
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [playerScore, setPlayerScore] = useState("0");

    useEffect(() => {
        setCurrentPlayer(sessionStorage.getItem("currentPlayer"));
    }, []);

    useEffect(() => {
        if (currentPlayer !== "") {
            getTwisterScore();
        }
    }, [currentPlayer]);

    const getTwisterScore = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/player/score?room_id=R${roomId}&player_name=${currentPlayer}`);

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
                    <PlayerTop playerName={currentPlayer}/>
                </div>
                <div className="twister-container">
                    {playerScore / 100 >= 50 ? (
                        <div className="twister-image">
                            <img src={likeIcon} alt="likeIcon" className="like-icon" />
                            <h1 className="like-text">잘하셨어요!</h1>
                        </div>
                        ):(
                        <div className="twister-image">
                            <img src={dislikeIcon} alt="dislikeIcon" className="dislike-icon"/>
                            <h1 className="dislike-text">아쉽습니다..</h1>
                        </div>
                    )}
                    <div className="twister-score-box">
                        <span>
                            <h2>{currentPlayer}님 유사도<br/>
                                <div className="twister-playerScore">{playerScore / 100}%</div>
                            </h2>
                        </span>
                    </div>
                </div>
            </div>
            <img src={backImage} alt="backImage" className="backImage-m"/>
        </div>
    )
}

export default TwisterPlayerRoundResult;