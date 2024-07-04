import React, {useState, useEffect, useRef} from 'react';
import {useSocket} from '../context/SocketContext.jsx';
import {useNavigate, useSearchParams} from "react-router-dom";
import '../../css/Participant/JoinRoom.css'
import '../../css/Moblie.css'
import Q2B from "../../image/Q2BEAT_2.png";
import Q2B_back from "../../image/background-image.png";
import {useModal} from "../context/ModalContext.jsx";

const JoinRoom = () => {
    const {sendMessage, roomId, clearPlayInformation, isConnected} = useSocket();
    const {showErrorModal, setModalType, setModalTitle, setModalBody} = useModal();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [roomInput, setRoomInput] = useState('');
    const [params, setParams] = useSearchParams();
    const isAvailable = useRef(false);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 세션 스토리지에서 이름을 가져와 초기화
        clearPlayInformation();
        const roomNumber = params.get("roomNumber");

        if (roomNumber) {
            setRoomInput(roomNumber);
        }

    }, []);

    useEffect(() => {
        sessionStorage.setItem('playerName', name);
        if (roomId && name) {
            navigate("/player/game/waiting");
        }
    }, [roomId]);

    const joinRoom = () => {
        if (roomInput.trim()) {
            if (!isConnected.current) {
                setModalType("error");
                setModalTitle("오류");
                setModalBody("현재 서버와 연결 중입니다. 다시 시도해 주세요.");
                showErrorModal();

                window.location.reload();
                return;
            }

            if (name === "") {
                setModalType("error");
                setModalTitle("오류");
                setModalBody("이름을 입력해 주세요.");
                showErrorModal();

                return;
            }

            if (name.includes("(HOST)")) {
                setModalType("error");
                setModalTitle("오류");
                setModalBody("'(HOST)' 가 포함된 단어는 이름으로 사용할 수 없습니다.");
                showErrorModal();

                return;
            }

            if (name.includes(":") || name.includes("-")) {
                setModalType("error");
                setModalTitle("오류");
                setModalBody("':', '-' 가 포함된 단어는 이름으로 사용할 수 없습니다.");
                showErrorModal();

                return;
            }

            isAvailableName().then(() => {
                if (isAvailable.current) {
                    sessionStorage.setItem('playerName', name);
                    sendMessage("JOIN:PLAYER:" + roomInput + ":" + name);
                } else {
                    setModalType("error");
                    setModalTitle("오류");
                    setModalBody("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.");
                    showErrorModal();
                }
            })
        }
    };

    const isAvailableName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/quiz/player/name/available?roomId=R${roomInput}&playerName=${name}`, {});

            if (!response.ok) {
                throw new Error('Failed to check name');
            }

            const result = await response.text();
            if (result === "true") {
                isAvailable.current = true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-m">
            <div className="Box-m">
                <div className="join-header">
                    <img src={Q2B} alt="Q2B" className="logoImage-m"/>
                    <h1 className="title-m">Q2BEAT</h1>
                </div>
                <div className="inputForm">
                    <div className="join-form">
                        <div className="box-input">
                            <div className="border-input">
                                <input
                                    className="join-input"
                                    placeholder="roomNum"
                                    type="number"
                                    maxLength="5"
                                    value={roomInput}
                                    onChange={(e) => setRoomInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="join-form">
                        {/*<h2 className="join-label-text">이름</h2>*/}
                        <div className="box-input">
                            <div className="border-input">
                                <input
                                    className="join-input"
                                    placeholder="name"
                                    type="text"
                                    maxLength="20"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={joinRoom} className="startBtn"><span>입장</span></button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default JoinRoom;
