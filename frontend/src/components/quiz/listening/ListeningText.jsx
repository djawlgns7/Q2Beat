import React, {useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/Moblie.css';
import Q2B_back from "../../../image/background-image.png";
import '../../../css/Quiz/Listening/ListeningText.css'
import Q2B from "../../../image/Q2BEAT_2.png";
import PlayerTop from "../PlayerTop.jsx";

const ListeningText = ({ prepareAnswer, onSkip }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [skipped, setSkipped] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setPlayerName(sessionStorage.getItem("playerName"));
    }, []);

    const onChange = (e) => {
        if (!skipped) {
            setAnswer(e.target.value);
        }
    };

    const onSubmit = async () => {
        if (!skipped) {
            console.log("Submitting answer: ", answer); // 로그 추가
            const data = await prepareAnswer(answer);
            if (!data.correct) {
                setFeedback("틀렸습니다. 다시 입력하세요");
            }
        }
    };

    const handleSkip = async () => {
        setSkipped(true);
        setFeedback("다른 참가자를 기다리는 중입니다");
        const response = await onSkip();
    };

    const handleSkipClick = () => {
        setShowModal(true);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        handleSkip();
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="container-m">
            <div className="Box-m">
                <div className="player-header">
                    <img src={Q2B} alt="Q2B" className="smallLogoImage-m"/>
                    <PlayerTop playerName={playerName} />
                </div>
                <div className="listening-main">
                    <h3 className="listening-round-m">Round 1</h3>
                    {/*<img src={SoundIcon} alt="SoundIcon" className="sound-icon"/>*/}
                    <ul className="wave-menu">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    {feedback && <div className="mt-2">{feedback}</div>}
                    <input className="listening-input"
                           type="text"
                           value={answer}
                           onChange={onChange}
                           disabled={skipped}
                           placeholder="정답을 입력해주세요!"
                    />
                    <div className="listening-buttons">
                        <button className="listening-btn" onClick={onSubmit} disabled={skipped}><span>제출</span></button>
                        <button className="listening-btn" onClick={handleSkipClick} disabled={skipped}><span>스킵</span>
                        </button>
                    </div>

                    {showModal && (
                        <div className="modal show">
                            <div className="modal-content">
                                <h5>정말 스킵하시겠습니까?</h5>
                                <div className="button-container">
                                    <button className="confirm-button" onClick={handleModalConfirm}>확인</button>
                                    <button className="cancel-button" onClick={handleModalCancel}>취소</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default ListeningText;