import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import '../../css/PC.css'
import '../../css/Host/RoomSetting.css'
import Q2B_back from "../../image/Q2Beat_background.png";
import React from "react";

const RoomSetting = () => {
    const {sendMessage, roomId} = useSocket();
    const gameType = String(useParams().id);
    const navigate = useNavigate();
    const setting = useRef(null);
    const playerNumber = sessionStorage.getItem('playerNumber');

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

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
                timeLimit: 15,
                level: "NORMAL"
            }
        } else if (gameType === "3") {
            setting.current = {
                gameMode: "POSE",
                round: 1,
                maxRound: 10,
                timeLimit: 30
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
        sessionStorage.setItem('setting', JSON.stringify(setting.current));
        sendMessage(`START:${roomId}:${setting.current.gameMode}:${setting.current.category}`);
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
                            <div className="roomSetting-container">
                                <div className="roomSetting-box">
                                    <div className="roomSetting-circle-header">
                                        {colors.map((color, index) => (
                                            <div key={index} className="circle"
                                                 style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                    <label className="roomSetting-label">카테고리
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"Category COMMON"}>
                                            <option value="category COMMON">상식</option>
                                            <option value="category COUNTRY">나라</option>
                                        </select>
                                    </label>
                                    <label className="roomSetting-label">제한 시간
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"timeLimit 15"}>
                                            <option value="timeLimit 5">5</option>
                                            <option value="timeLimit 10">10</option>
                                            <option value="timeLimit 15">15</option>
                                            <option value="timeLimit 20">20</option>
                                        </select>
                                    </label>
                                    <label className="roomSetting-label">라운드 수
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"maxRound 5"}>
                                            <option value="maxRound 1">1라운드</option>
                                            <option value="maxRound 5">5라운드</option>
                                            <option value="maxRound 10">10라운드</option>
                                            <option value="maxRound 15">15라운드</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="roomSetting-buttons">
                                    <button onClick={gameStart} className="roomSetting-btn">시작</button>
                                    <button onClick={exitButton} className="roomSetting-btn">나가기</button>
                                </div>
                                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                            </div>
                        )
                    case '1':
                        return (
                            <div className="roomSetting-container">
                                <div className="roomSetting-box">
                                    <div className="roomSetting-circle-header">
                                        {colors.map((color, index) => (
                                            <div key={index} className="circle"
                                                 style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                    <label className="roomSetting-label">카테고리
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"category 90"}>
                                            <option value="categoty 90">1990년대</option>
                                            <option value="category 00">2000년대</option>
                                            <option value="category 10">2010년대</option>
                                            <option value="category 20">2020년대</option>
                                        </select>
                                    </label>
                                    <label className="roomSetting-label">라운드 수
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"maxRound 5"}>
                                            <option value="maxRound 1">1라운드</option>
                                            <option value="maxRound 5">5라운드</option>
                                            <option value="maxRound 10">10라운드</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="roomSetting-buttons">
                                    <button onClick={gameStart} className="roomSetting-btn">시작</button>
                                    <button onClick={exitButton} className="roomSetting-btn">나가기</button>
                                </div>
                                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                            </div>
                        )
                    case '2':
                        return (
                            <div className="roomSetting-container">
                                <div className="roomSetting-box">
                                    <div className="roomSetting-circle-header">
                                        {colors.map((color, index) => (
                                            <div key={index} className="circle"
                                                 style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                    <label className="roomSetting-label">라운드 수
                                        <select className="roomSetting-select" disabled={true}>
                                            <option>{playerNumber}</option>
                                        </select>
                                    </label>
                                    <label className="roomSetting-label">난이도
                                        <select onChange={selectChange} className="roomSetting-select" defaultValue={"level NORMAL"}>
                                            <option value={"level EASY"}>쉬움</option>
                                            <option value={"level NORMAL"}>보통</option>
                                            <option value={"level HARD"}>어려움</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="roomSetting-buttons">
                                    <button onClick={gameStart} className="roomSetting-btn">시작</button>
                                    <button onClick={exitButton} className="roomSetting-btn">나가기</button>
                                </div>
                                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                            </div>
                        )
                    case '3':
                        return (
                            <div className="roomSetting-container">
                                <div className="roomSetting-box">
                                    <div className="roomSetting-circle-header">
                                        {colors.map((color, index) => (
                                            <div key={index} className="circle"
                                                 style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                    <label className="roomSetting-label">제한시간
                                        <select onChange={selectChange} className="roomSetting-select">
                                            <option>30초</option>
                                        </select>
                                    </label>
                                    <label className="roomSetting-label">라운드 수
                                        <select onChange={selectChange} className="roomSetting-select">
                                            <option>10라운드</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="roomSetting-buttons">
                                    <button onClick={gameStart} className="roomSetting-btn">시작</button>
                                    <button onClick={exitButton} className="roomSetting-btn">나가기</button>
                                </div>
                                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                            </div>
                        )
                }
            })()}
        </div>
    );
}

export default RoomSetting;