import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "../context/SocketContext.jsx";
import {useNavigate} from "react-router-dom";
import '../../css/Host/Lobby.css'
import '../../css/PC.css'
import Q2B from "../../image/Q2BEAT_2.png";
import {useModal} from "../context/ModalContext.jsx";
import Q2B_back from "../../image/Q2Beat_background.png";

console.log("\tLobby.jsx from jun");
const Lobby = () => {
    const {socketRef, sendMessage, roomId, setRoomId, isConnected, clientMessage, setClientMessage, clearPlayInformation} = useSocket();
    const {showModal, setModalType, setModalTitle, setModalBody} = useModal();
    const [name, setName] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [state, setState] = useState("hide");
    const navigate = useNavigate();

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('hostName');
        clearPlayInformation();
        //session에 방 이름 있으면 게임 진행. 없으면 /host/game/create로.
        if (roomId && storedName !== null) {
            console.log("방이름:"+storedName+"\tfrom Lobby.jsx jun");
            setName(storedName);
        } else {
            navigate("/host/game/create");
        }
    }, []);

    useEffect(() => {
        setClientMessage("");

        if (roomId !== null && roomId !== undefined) {
            getPlayersList();
        }
    }, [clientMessage]);

    const getPlayersList = async () => {
        try {
            const response = await fetch(`https://bit-two.com/q2beat/quiz/player/list?roomId=${roomId}`)
            if (!response.ok) {
                throw new Error('Failed to get player list');
            }
            const data = await response.json();
            setParticipants(data);
        } catch (error) {
            console.error('Error fetching player list:', error);
        }
    }

    const startQuiz = (gameType) => {
        console.log("gameType:"+gameType+"start Quiz \tfrom Lobby.jsx jun")
        if (isConnected.current && roomId) {
            //navigate("/host/game/count");
            navigate("/host/game/setting/"+gameType);
        }
    }

    const showQR = () => {
        setModalType("QR");
        setModalTitle("QR코드 표시");
        setModalBody(`https://q2beat.vercel.app/player/game/join?roomNumber=${roomId}`)
        showModal();
    }

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            sendMessage(`MESSAGE:${roomId}:HOST:DISMISS`);

            sessionStorage.removeItem('hostName');
            sessionStorage.removeItem('roomId');
            setRoomId(null);
            socketRef.current.close();

            window.location.reload();
        }
    }

    return (
        <div className="lobby-container">
            <div className="lobby-box">
                <div className="lobby-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage"/>
                    <div className="circle-header">
                        {colors.map((color, index) => (
                            <div key={index} className="circle" style={{backgroundColor: color}}></div>
                        ))}
                    </div>
                    <h2 className="room-number">방 번호 : {roomId}</h2>
                    <button className="qrCode-btn" onClick={showQR}>QR</button>
                    <button onClick={exitRoom} className="exit-btn">나가기</button>
                </div>

                <div className="main-contents">
                    <div className="left-section">
                        <div className="player-box">
                            <h3 className="player-count">플레이어 : {participants.length}</h3>
                            <div className="players">
                                {participants.map((participant, index) => (
                                    <div key={index} className="player">{participant.player_name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="game-options">
                            <div className="option-1 option-btn-1-container">
                                <button className="option-btn-1">퀴즈</button>
                                <button className="hover-button" onClick={()=>{startQuiz(0)}}>시작하기</button>
                            </div>
                            <div className="option-1 option-btn-1-container">
                                <button className="option-btn-1">노래 맞추기</button>
                                <button className="hover-button" onClick={()=>{startQuiz(1)}}>시작하기</button>
                            </div>
                            <div className="option-2 option-btn-1-container">
                                <button className="option-btn-1">노래 부르기</button>
                                <button className="hover-button" onClick={()=>{startQuiz(2)}}>시작하기</button>
                            </div>
                            <div className="option-2 option-btn-1-container">
                                <button className="option-btn-1">포즈 따라하기</button>
                                <button className="hover-button" onClick={()=>{startQuiz(3)}}>시작하기</button>
                            </div>
                            {/*<div className="actions">*/}
                            {/*    <button onClick={startQuiz} className="action-btn">시작하기</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};
export default Lobby;
