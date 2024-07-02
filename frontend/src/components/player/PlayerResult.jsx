import {useSocket} from "../context/SocketContext.jsx";
import PlayerTop from "../quiz/PlayerTop.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/background-image.png";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerRoundResult.css'

const PlayerResult = () => {
    const {roomId, hostMessage} = useSocket();
    const playerName = useRef("");
    const gameMode = useRef("");
    const playerScore = useRef("0");
    const [isReady, setIsReady] = useState(false);
    const [rank, setRank] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        playerName.current = sessionStorage.getItem("playerName");
        gameMode.current = sessionStorage.getItem("gameMode");
        playerScore.current = sessionStorage.getItem("playerScore");

        fetchPlayerRank();

        setIsReady(true);
    }, []);

    useEffect(() => {
        if (hostMessage === "RETURNLOBBY") {
            navigate("/player/game/waiting");
        }
    }, [hostMessage]);

    const fetchPlayerRank = async () => {
        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/get/player/rank?roomId=${roomId}&playerName=${playerName.current}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player rank');
            }
            const data = await response.text();

            if (data === "-1") {
                setRank("게임에 참가하지 않은 유저입니다");
            } else {
                setRank(data);
            }
        } catch (error) {
            console.error('Error fetching player rank:', error);
        }
    };

    return (
        <>
            {isReady ? (
                <>
                    <div className="container-m">
                        <div className="loginBox-m">
                            <div className="player-header">
                                <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                                <PlayerTop playerName={playerName.current}/>
                            </div>
                            <div className="round-result">
                                <h1 className="result-text">최종 결과</h1>
                                <h3 className="result-text result-rank">{Number(rank) + 1}등</h3>
                                {gameMode.current === "TWISTER" || gameMode.current === "POSE" ?
                                    <h4 className="result-text">{playerScore.current}%</h4>
                                    :
                                    <h4 className="result-text">{playerScore.current}점</h4>
                                }

                            </div>
                        </div>
                        <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PlayerResult;