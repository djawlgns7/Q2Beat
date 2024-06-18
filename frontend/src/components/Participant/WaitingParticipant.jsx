import React, {useState, useEffect} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate} from "react-router-dom";
import '../../css/Participant/WaitingParticipant.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";

const WaitingParticipant = () => {
    const {socketRef, roomId, setRoomId, hostMessage, setHostMessage} = useSocket();
    const [name, setName] = useState(sessionStorage.getItem('participantName') || '');
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        const storedName = sessionStorage.getItem('participantName');
        if (roomId && storedName !== null) {
            setName(storedName);
        } else {
            navigate("/join-room");
        }
    }, []);

    useEffect(() => {
        // 방장이 시작 신호를 보내면
        if(hostMessage === "NORMAL") {
            alert("게임 시작");
            //navigate("/quiz-normal");
            setHostMessage("");
        }
    }, [hostMessage]);

    const exitRoom = () => {
        const reply = confirm("방을 나가시겠습니까?");
        if (reply) {
            sessionStorage.removeItem('participantName');
            sessionStorage.removeItem('roomId');
            setRoomId(null);
            socketRef.current.close();

            window.location.reload();
        }
    }

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="waitingPart-main-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage"/>
                    <span className="name-header">{name} 님</span>
                </div>
                <h1>방번호 : {roomId}</h1>
                <br/>
                <h2>방장이 시작하길 기다리고 있습니다...</h2>
                <button onClick={exitRoom} className="exitBtn">나가기</button>
            </div>
        </div>
    );
};

export default WaitingParticipant;