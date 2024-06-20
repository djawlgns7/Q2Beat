import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import PlayerTop from "../quiz/PlayerTop.jsx";
import Q2B_back from "../../image/Q2Beat_background.png";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerCount.css'

const PlayerCount = () => {
    const [currentTime, setCurrentTime] = useState(3);
    const intervalRef = useRef(null);
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        setPlayerName(sessionStorage.getItem("playerName"));

        startTimer(3);
    }, []);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);
            navigate("/player/game/question");
        }
    }, [currentTime])

    const startTimer = (prevTime) => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    return (
        <div className="count-container-m">
            {/*<PlayerTop playerName={playerName}/>*/}
            <div className="currentTime-box">
                <h1 className="currentTime">{currentTime}</h1>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    )
}

export default PlayerCount;