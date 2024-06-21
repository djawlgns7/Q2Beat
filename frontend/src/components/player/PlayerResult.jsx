import {useSocket} from "../context/SocketContext.jsx";
import PlayerTop from "../quiz/PlayerTop.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/Q2Beat_background.png";
import '../../css/Moblie.css'
import '../../css/Participant/PlayerRoundResult.css'

const PlayerResult = () => {
    const {roomId, hostMessage} = useSocket();
    const playerName = useRef("");
    const gameMode = useRef("");
    const playerScore = useRef("");
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
        if(hostMessage === "RETURNLOBBY") {
            navigate("/player/game/waiting");
        }
    }, [hostMessage]);

    const fetchPlayerRank = async () => {
        try {
            const response = await fetch(`/quiz/get/player/rank?roomId=${roomId}&playerName=${playerName.current}`);
            if (!response.ok) {
                throw new Error('Failed to fetch player rank');
            }
            const data = await response.text();

            if(data === "-1") {
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
                gameMode.current === "NORMAL" ? (
                    // 일반 게임
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
                                    <h4 className="result-text">{playerScore.current}점</h4>
                                </div>
                            </div>
                            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
                        </div>
                    </>
                ) : gameMode.current === "SINGING" ? (
                    // 노래부르기
                    <h1>노래부르기</h1>
                ) : gameMode.current === "LYRIC" ? (
                    // 가사 맞추기
                    <h1>가사 맞추기</h1>
                ) : gameMode.current === "POSE" ? (
                    // 포즈 따라하기
                    <h1>포즈 따라하기</h1>
                ) : (
                    <h1>오류 발생</h1>
                )
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PlayerResult;