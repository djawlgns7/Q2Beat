import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import '../../css/PC.css'
import '../../css/Host/RoomSetting.css'
import BackgroundVideo from "../BackgroundVideo.jsx";
import BackMusic from "../BackMusic.jsx";

const RoomSetting = () => {
    const {sendMessage, roomId} = useSocket();
    const gameType = String(useParams().id);
    const navigate = useNavigate();
    const setting = useRef(null);
    const playerNumber = sessionStorage.getItem('playerNumber');

    useEffect(() => {
        if (gameType === "0") {
            setting.current = {
                gameMode: "NORMAL",
                round: 1,
                maxRound: 5,
                timeLimit: 15,
                category: "COMMON"
            }
        } else if (gameType === "1") {
            setting.current = {
                gameMode: "LISTENING",
                round: 1,
                maxRound: 5,
                timeLimit: 10,
                category: 90
            }
        } else if (gameType === "2") {
            setting.current = {
                gameMode: "TWISTER",
                round: 1,
                maxRound: playerNumber,
                timeLimit: 10,
                level: "NORMAL"
            }
        } else if (gameType === "3") {
            setting.current = {
                gameMode: "POSE",
                round: 1,
                maxRound: playerNumber,
                timeLimit: 10,
                level: "NORMAL"
            }
        }
    }, [gameType]);

    const selectChange = (e) => {
        const [key, value] = e.target.value.split(' ');
        setting.current = {
            ...setting.current,
            [key]: value,
        }
    }

    const gameStart = () => {
        if (playerNumber === "0") {
            alert("방에 들어와 있는 사람이 없습니다.");
            return;
        }

        if (setting.current.gameMode === "TWISTER" && setting.current.level === "HARD") {
            setting.current.timeLimit = 15;
        }

        sessionStorage.setItem('setting', JSON.stringify(setting.current));
        sendMessage(`START:${roomId}:${setting.current.gameMode}`);
        navigate("/host/game/count");
    }

    const exitButton = () => {
        navigate("/host/game/lobby");
    }

    return (
        <div>
            {(() => {
                switch (gameType) {
                    case '0':
                        return (
                            <div className="container-p">
                                <BackMusic src="/클럽 댄스 배경음악.mp3" initialVolume={0.5}/>
                                <BackgroundVideo/>
                                <div className="contents-box-p">
                                    <div className="label-section-three">
                                        <label className="roomSetting-label">카테고리
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"Category COMMON"}>
                                                <option value="category COMMON">상식</option>
                                                <option value="category SPORTS">스포츠</option>
                                                <option value="category IT">IT 상식</option>
                                            </select>
                                        </label>
                                        <label className="roomSetting-label">제한 시간
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"timeLimit 15"}>
                                                <option value="timeLimit 5">5</option>
                                                <option value="timeLimit 10">10</option>
                                                <option value="timeLimit 15">15</option>
                                                <option value="timeLimit 20">20</option>
                                            </select>
                                        </label>
                                        <label className="roomSetting-label">라운드 수
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"maxRound 5"}>
                                                <option value="maxRound 1">1라운드</option>
                                                <option value="maxRound 5">5라운드</option>
                                                <option value="maxRound 10">10라운드</option>
                                                <option value="maxRound 15">15라운드</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="roomSetting-buttons">
                                        <button onClick={gameStart} className="roomSetting-btn"><span>시작</span></button>
                                        <button onClick={exitButton} className="roomSetting-btn"><span>나가기</span></button>
                                    </div>
                                </div>
                            </div>
                        )
                    case '1':
                        return (
                            <div className="container-p">
                                <BackgroundVideo/>
                                <div className="contents-box-p">
                                    <div className="label-section">
                                        <label className="roomSetting-label">카테고리
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"category 90"}>
                                                <option value="categoty 90">1990년대</option>
                                                <option value="category 00">2000년대</option>
                                                <option value="category 10">2010년대</option>
                                                <option value="category 20">2020년대</option>
                                            </select>
                                        </label>
                                        <label className="roomSetting-label">라운드수
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"maxRound 5"}>
                                                <option value="maxRound 1">1라운드</option>
                                                <option value="maxRound 5">5라운드</option>
                                                <option value="maxRound 10">10라운드</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="roomSetting-buttons">
                                        <button onClick={gameStart} className="roomSetting-btn"><span>시작</span></button>
                                        <button onClick={exitButton} className="roomSetting-btn"><span>나가기</span></button>
                                    </div>
                                </div>
                            </div>
                        )

                    case '2':
                        return (
                            <div className="container-p">
                                <BackgroundVideo/>
                                <div className="contents-box-p">
                                    <div className="label-section">
                                        <label className="roomSetting-label">라운드 수
                                            <select className="roomSetting-select" disabled={true}>
                                                <option>{playerNumber}</option>
                                            </select>
                                        </label>
                                        <label className="roomSetting-label level">난이도
                                            <select onChange={selectChange} className="roomSetting-select level"
                                                    defaultValue={"level NORMAL"}>
                                                <option value={"level EASY"}>쉬움</option>
                                                <option value={"level NORMAL"}>보통</option>
                                                <option value={"level HARD"}>어려움</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="roomSetting-buttons">
                                        <button onClick={gameStart} className="roomSetting-btn"><span>시작</span></button>
                                        <button onClick={exitButton} className="roomSetting-btn"><span>나가기</span></button>
                                    </div>
                                </div>
                            </div>
                        )
                    case '3':
                        return (
                            <div className="container-p">
                                <BackgroundVideo/>
                                <div className="contents-box-p">
                                    <div className="label-section">
                                        <label className="roomSetting-label round-count-label">라운드 수
                                            <select className="roomSetting-select round-count" disabled={true}>
                                                <option>{playerNumber}</option>
                                            </select>
                                        </label>
                                        <label className="roomSetting-label">난이도
                                            <select onChange={selectChange} className="roomSetting-select"
                                                    defaultValue={"level NORMAL"} disabled={true}>
                                                <option value={"level EASY"}>쉬움</option>
                                                <option value={"level NORMAL"}>보통</option>
                                                <option value={"level HARD"}>어려움</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="roomSetting-buttons">
                                        <button onClick={gameStart} className="roomSetting-btn"><span>시작</span></button>
                                        <button onClick={exitButton} className="roomSetting-btn"><span>나가기</span></button>
                                    </div>
                                </div>
                            </div>
                        )
                }
            })()}
        </div>
    );
}

export default RoomSetting;
